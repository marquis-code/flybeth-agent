<template>
  <div class="fixed inset-0 z-[9999] bg-[#F8FAFC] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-700">
    <!-- Wizard Container -->
    <div class="h-full w-full relative flex flex-col">
      
      <!-- Professional Top Navigation / Progress -->
      <div class="px-4 lg:px-12 py-4 lg:py-8 bg-white border-b border-gray-100 shrink-0 sticky top-0 z-[10]">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Plane class="h-5 w-5 lg:h-6 lg:h-6" />
            </div>
            <div>
              <h2 class="text-sm lg:text-sm  text-gray-900 ">Booking Pipeline</h2>
              <div class="flex items-center space-x-2 text-sm font-medium text-gray-800 uppercase ">
                <span>{{ selectedFlight?.airline }}</span>
                <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{{ selectedFlight?.flightNumber }}</span>
              </div>
            </div>
          </div>

          <!-- Progress Bar - Mobile Responsive Scroll -->
          <div class="flex items-center space-x-8 lg:space-x-12 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            <div v-for="(step, idx) in steps" :key="step.id" class="flex items-center shrink-0">
              <div class="flex items-center space-x-4">
                <div 
                  class="w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center text-sm lg:text-sm font-bold transition-all duration-500"
                  :class="currentStepIndex >= idx ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-800 border border-gray-100'"
                >
                  <Check v-if="currentStepIndex > idx" class="h-4 w-4 lg:h-5 lg:w-5" />
                  <span v-else>{{ idx + 1 }}</span>
                </div>
                <div class="flex flex-col hidden sm:flex">
                  <span class="text-sm lg:text-sm font-bold uppercase  transition-colors" :class="currentStepIndex >= idx ? 'text-gray-900' : 'text-gray-800'">{{ step.title }}</span>
                  <span class="text-sm font-medium text-gray-800 mt-0.5 whitespace-nowrap">{{ step.desc }}</span>
                </div>
              </div>
              <div v-if="idx < steps.length - 1" class="w-6 lg:w-12 h-px bg-gray-100 mx-4 lg:mx-6"></div>
            </div>
          </div>

          <button @click="$emit('close')" class="absolute top-4 right-4 lg:relative lg:top-0 lg:right-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-800 hover:text-red-500 hover:bg-red-50 transition-all">
            <X class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto bg-[#F8FAFC] custom-scrollbar">
        <div class="max-w-[1400px] mx-auto p-4 lg:p-12">
          

          <!-- Unified Grid for Steps 1, 2, and 3 -->
          <div v-if="currentStep !== 'confirmation'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start animate-in fade-in duration-500">
            <!-- Left Column: Step-Specific Forms -->
            <div class="lg:col-span-8 space-y-8 lg:space-y-12">
              
              <!-- Step 1: Traveler Details -->
              <div v-if="currentStep === 'cart'" class="space-y-8 lg:space-y-12">
                <section class="space-y-6">
                  <div class="flex items-center justify-between px-2">
                    <h3 class="text-sm lg:text-lg  text-gray-900 ">Traveler Details</h3>
                    <div class="px-4 py-1.5 bg-gray-900 text-sm  text-white rounded-full uppercase ">Agent Portal</div>
                  </div>
                  
                  <!-- Passenger Forms -->
                  <div v-for="(p, idx) in form.passengers" :key="idx" class="bg-white border border-gray-100 rounded-[2.5rem] p-6 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-500 space-y-8 relative group/p">
                    <button v-if="form.passengers.length > 1" @click="removePassenger(idx)" class="absolute top-6 right-6 p-2 rounded-xl bg-red-50 text-red-500 opacity-0 group-hover/p:opacity-100 transition-opacity">
                      <TrashIcon class="h-5 w-5" />
                    </button>
                    
                    <div class="flex items-center space-x-3 text-primary">
                      <UserIcon class="h-5 w-5" />
                      <span class="text-sm  uppercase ">Passenger {{ idx + 1 }}</span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      <div class="space-y-3">
                         <label class="text-sm font-bold text-gray-800 uppercase  ml-1">Title</label>
                         <select v-model="p.title" class="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm font-bold text-gray-900 focus:bg-white focus:ring-1 focus:ring-primary outline-none transition-all">
                           <option value="mr">Mr</option>
                           <option value="mrs">Mrs</option>
                           <option value="miss">Miss</option>
                           <option value="ms">Ms</option>
                         </select>
                      </div>
                      <AnimatedInput v-model="p.firstName" label="First Name" :icon="UserIcon" />
                      <AnimatedInput v-model="p.lastName" label="Last Name" :icon="UserIcon" />
                      <div class="space-y-3">
                         <label class="text-sm font-bold text-gray-800 uppercase  ml-1">Gender</label>
                         <select v-model="p.gender" class="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm font-bold text-gray-900 focus:bg-white focus:ring-1 focus:ring-primary outline-none transition-all">
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                         </select>
                      </div>
                      <BirthDatePicker v-model="p.dob" placeholder="Date of birth" />
                      <AnimatedInput v-model="p.passport" label="Passport Number" :icon="IdentificationIcon" />
                      <AnimatedInput v-model="p.email" label="Email Address" :icon="EnvelopeIcon" />
                      <PhoneNumberInput v-model="p.phone" label="Phone Number" />
                    </div>
                  </div>

                  <!-- Add Passenger Button -->
                  <button @click="addPassenger" class="w-full py-6 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex items-center justify-center space-x-3 text-gray-800 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group">
                    <PlusIcon class="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span class="text-sm  uppercase ">Add Another Passenger</span>
                  </button>
                </section>

                <!-- Earnings & Adjustments -->
                <section class="bg-white border border-gray-100 rounded-[2.5rem] p-8 lg:p-10 shadow-sm relative overflow-hidden group">
                   <div class="relative z-10 space-y-10">
                      <div class="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                        <div class="flex items-center space-x-4">
                          <div class="w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center">
                            <BanknotesIcon class="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 class="text-sm lg:text-sm  text-gray-900  leading-none">Earnings & Adjustments</h4>
                            <p class="text-sm font-medium text-gray-800 uppercase  mt-2">Personalize your agency margins</p>
                          </div>
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="space-y-3">
                          <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">Service Fee</label>
                          <div class="relative group/field">
                            <span class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-800 font-bold group-focus-within/field:text-primary transition-colors">{{ currentCurrency.symbol }}</span>
                            <input type="number" v-model="form.agentServiceFee" class="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-5 text-sm font-bold text-gray-900 focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" />
                          </div>
                        </div>
                        <div class="space-y-3">
                          <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">Markup Per Adult</label>
                          <div class="relative group/field">
                            <span class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-800 font-bold group-focus-within/field:text-primary transition-colors">{{ currentCurrency.symbol }}</span>
                            <input type="number" v-model="form.adultMarkup" class="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-5 text-sm font-bold text-gray-900 focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" />
                          </div>
                        </div>
                      </div>
                   </div>
                </section>
              </div>

              <!-- Step 1.5: Seat Selection -->
              <div v-if="currentStep === 'seats'" class="space-y-8 lg:space-y-12">
                 <SeatSelectionUI 
                   :flightOffer="selectedFlight"
                   :passengers="form.passengers"
                   v-model="form.services"
                   @update:totalPrice="val => seatPrice = val"
                 />
              </div>

              <!-- Step 2: Final Summary -->
              <div v-if="currentStep === 'review'" class="space-y-8 lg:space-y-12">
                <h3 class="text-sm lg:text-lg  text-gray-900  px-2">Final Summary</h3>
                
                <div class="space-y-6 lg:space-y-8">
                  <!-- Trip Summary -->
                  <div class="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                    <h4 class="text-sm font-semibold text-gray-800 uppercase  mb-10 pb-4 border-b border-gray-50">Itinerary Overview</h4>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-lg  text-gray-900 ">{{ selectedFlight.origin }}</p>
                        <p class="text-sm font-semibold text-gray-800 mt-2 uppercase ">{{ formatTime(selectedFlight.departureTime) }}</p>
                      </div>
                      <div class="flex-1 px-8 lg:px-16">
                        <div class="h-px bg-gray-100 relative">
                          <Plane class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary rotate-90" />
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="text-lg  text-gray-900 ">{{ selectedFlight.destination }}</p>
                        <p class="text-sm font-semibold text-gray-800 mt-2 uppercase ">{{ formatTime(selectedFlight.arrivalTime) }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Travelers List -->
                  <div class="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm">
                    <h4 class="text-sm font-semibold text-gray-800 uppercase  mb-8 pb-4 border-b border-gray-50">Traveler Roster</h4>
                    <div class="divide-y divide-gray-50">
                      <div v-for="(p, idx) in form.passengers" :key="idx" class="py-5 flex items-center justify-between group">
                        <div class="flex items-center space-x-5">
                          <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-800  text-sm group-hover:bg-primary/10 group-hover:text-primary transition-all">{{ idx + 1 }}</div>
                          <div>
                            <p class="text-sm lg:text-sm  text-gray-900">{{ p.firstName }} {{ p.lastName }}</p>
                            <p class="text-sm font-medium text-gray-800 mt-1">{{ p.passport }}</p>
                          </div>
                        </div>
                        <span class="text-sm  px-4 py-1.5 bg-gray-50 rounded-full text-gray-800 uppercase ">ADULT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3: Payment & Additional Services -->
              <div v-if="currentStep === 'payment'" class="space-y-6 lg:space-y-8">
                
                <!-- Travel Insurance Section -->
                <div class="bg-white rounded-t-xl rounded-b-md border border-sky-600/30 overflow-hidden shadow-sm">
                  <div class="bg-sky-600 text-white px-6 py-4 flex items-center gap-3">
                    <ShieldCheckIcon class="h-6 w-6 text-white" />
                    <h3 class="text-sm font-bold">Cover your trip with Travel Insurance?</h3>
                  </div>
                  <div class="p-6 space-y-6">
                    <p class="text-sm font-medium text-gray-800">A travel insurance plan can help cover your vacation investment, offset expenses from travel mishaps and provide you with emergency travel assistance.</p>
                    
                    <div class="space-y-4">
                      <label class="flex items-start gap-4 cursor-pointer group">
                        <input type="radio" v-model="form.hasInsurance" :value="true" class="mt-1 h-5 w-5 text-primary focus:ring-primary border-gray-300" />
                        <div>
                          <span class="text-sm font-semibold text-gray-900">Yes, include travel insurance + {{ formatPrice(43.01) }}</span>
                          <p class="text-sm text-gray-800 mt-0.5">(Only available to residents U.S. states and the District of Columbia.)</p>
                          <p class="text-sm text-gray-800 mt-1">By clicking yes, I acknowledge that I have read, understand and agree to the terms and conditions of the Policy of Insurance and Important Required Disclosures. Quoted price for the plan includes both insurance premium and fee for travel assistance services.</p>
                        </div>
                      </label>

                      <label class="flex items-start gap-4 cursor-pointer group">
                        <input type="radio" v-model="form.hasInsurance" :value="false" class="mt-1 h-5 w-5 text-primary focus:ring-primary border-gray-300" />
                        <span class="text-sm font-semibold text-gray-900">No, I decline the option to purchase travel insurance</span>
                      </label>
                    </div>
                    <p class="text-sm font-bold text-gray-900">Coverage is offered by AIG Travel Guard Group Inc. Click here for full details.</p>
                  </div>
                </div>

                <!-- Payment Information Section -->
                <div class="bg-white border border-gray-100 rounded-[2rem] overflow-visible shadow-sm hover:shadow-md transition-shadow z-[20]">
                  <div class="bg-primary text-white px-6 py-5 flex items-center justify-between rounded-t-[2rem]">
                    <div class="flex items-center gap-4">
                      <div class="flex items-center justify-center w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm text-white  text-sm">3</div>
                      <h3 class="text-sm   underline-offset-4 decoration-white/30">Secure Payment</h3>
                    </div>
                    <Lock class="h-5 w-5 text-white/80" />
                  </div>
                  
                  <div class="bg-white text-gray-900 p-8">
                    <div class="flex flex-col gap-4 text-sm font-semibold text-gray-800 uppercase  border-b border-gray-50 pb-8 mb-8">
                      <span class="shrink-0 text-gray-900 mb-2">Select Payment Routing:</span>
                      
                      <!-- Flybeth Wallet Option -->
                      <label 
                        class="flex items-center p-6 border rounded-[1.5rem] cursor-pointer transition-all duration-300 relative group"
                        :class="form.paymentMethod === 'wallet' ? 'border-primary bg-primary/[0.02] ring-1 ring-primary' : 'border-gray-100 bg-gray-50 hover:border-gray-200'"
                      >
                        <input type="radio" v-model="form.paymentMethod" value="wallet" class="hidden" />
                        <div class="flex items-center justify-between w-full">
                          <div class="flex items-center gap-5">
                            <div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                              <BanknotesIcon class="h-7 w-7" />
                            </div>
                            <div>
                              <p class="text-base  text-gray-900 ">Flybeth Wallet</p>
                              <p class="text-xs font-semibold text-primary uppercase  mt-1">Instant Confirmation & Ticketing</p>
                            </div>
                          </div>
                          <div class="text-right">
                            <p class="text-lg  text-gray-900">{{ formatPrice(agentWallet.balance) }}</p>
                            <p class="text-xs font-bold text-gray-800 uppercase  mt-1">Balance</p>
                          </div>
                        </div>
                        <div v-if="form.paymentMethod === 'wallet'" class="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                          <Check class="h-4 w-4" />
                        </div>
                      </label>

                      <!-- Alternative Payment Option -->
                      <label 
                        class="flex items-center p-6 border rounded-[1.5rem] cursor-pointer transition-all duration-300 relative group"
                        :class="form.paymentMethod === 'card' ? 'border-primary bg-primary/[0.02] ring-1 ring-primary' : 'border-gray-100 bg-gray-50 hover:border-gray-200'"
                      >
                        <input type="radio" v-model="form.paymentMethod" value="card" class="hidden" />
                        <div class="flex items-center justify-between w-full">
                          <div class="flex items-center gap-5">
                            <div class="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-white">
                              <CreditCardIcon class="h-7 w-7" />
                            </div>
                            <div>
                              <p class="text-base  text-gray-900 ">Card / Direct Transfer</p>
                              <p class="text-xs font-semibold text-gray-800 uppercase  mt-1">48 Hours Confirmation Process</p>
                            </div>
                          </div>
                        </div>
                        <div v-if="form.paymentMethod === 'card'" class="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                          <Check class="h-4 w-4" />
                        </div>
                      </label>
                    </div>
                    <p class="text-xs text-gray-800 font-bold mb-8 flex items-center gap-2">
                       <AlertCircle class="h-4 w-4 text-primary" />
                       Final prices are inclusive of all taxes and agency service fees.
                    </p>

                    <!-- Card Details Form (Only when Card method selected) -->
                    <div v-if="form.paymentMethod === 'card'" class="mt-2 animate-in fade-in slide-in-from-top-4 space-y-8">
                       <div class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mb-8">
                         <p class="text-sm font-bold text-gray-900">Important Note:</p>
                         <p class="text-sm text-gray-800 mt-2">Bookings made with card or bank transfer require verification. Flights are not guaranteed until payment is reconciled, which may take up to 48 hours.</p>
                       </div>
                       <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                          <!-- Card fields go here... -->
                       </div>
                    </div>
                      <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">Full Name on Card</label>
                        <input 
                          v-model="form.cardDetails.name" 
                          @input="validateField('name')"
                          type="text" 
                          class="w-full h-14 bg-gray-50 border rounded-2xl px-5 text-sm font-bold focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-600" 
                          :class="cardErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-100'"
                          placeholder="John Doe"
                        />
                        <div v-if="cardErrors.name" class="flex items-center gap-2 text-sm text-red-500  uppercase  ml-1 mt-1">
                          <AlertCircle class="h-3 w-3" />
                          {{ cardErrors.name }}
                        </div>
                      </div>
                      <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">Card Number</label>
                        <div class="relative group">
                          <input 
                            v-model="form.cardDetails.number" 
                            @input="handleCardInput" 
                            type="text" 
                            maxlength="19" 
                            class="w-full h-14 bg-gray-50 border rounded-2xl pl-5 pr-28 text-sm   focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                            :class="cardErrors.number ? 'border-red-500 bg-red-50' : 'border-gray-100'"
                            placeholder="•••• •••• •••• ••••"
                          />
                          <div class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-1.5 grayscale group-focus-within:grayscale-0 transition-all">
                             <div class="w-7 h-4 bg-blue-500/10 rounded flex items-center justify-center text-sm  text-blue-600 italic">VISA</div>
                             <div class="w-7 h-4 bg-rose-500/10 rounded flex items-center justify-center text-sm  text-rose-600 italic">MC</div>
                             <div class="w-7 h-4 bg-sky-500/10 rounded flex items-center justify-center text-sm  text-sky-600 italic">AX</div>
                          </div>
                        </div>
                        <div v-if="cardErrors.number" class="flex items-center gap-2 text-sm text-red-500  uppercase  ml-1 mt-1">
                          <AlertCircle class="h-3 w-3" />
                          {{ cardErrors.number }}
                        </div>
                      </div>
                      <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">Expiration Metadata</label>
                        <div class="grid grid-cols-2 gap-4">
                           <SelectInput 
                             v-model="form.cardDetails.expMonth"
                             label="Month"
                             :options="expiryMonths"
                             :has-error="!!cardErrors.expMonth"
                             :show-error="false"
                             position="standalone"
                             @update:model-value="validateField('expMonth')"
                           />
                           <SelectInput 
                             v-model="form.cardDetails.expYear"
                             label="Year"
                             :options="expiryYears"
                             :has-error="!!cardErrors.expYear"
                             :show-error="false"
                             position="standalone"
                             @update:model-value="validateField('expYear')"
                           />
                        </div>
                        <div v-if="cardErrors.expMonth || cardErrors.expYear" class="flex items-center gap-2 text-sm text-red-500  uppercase  ml-1 mt-1">
                          <AlertCircle class="h-3 w-3" />
                          Expiry is required
                        </div>
                      </div>

                      <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">CVV / CVC</label>
                        <div class="flex flex-col gap-1">
                          <div class="relative max-w-[120px] group">
                            <input 
                              v-model="form.cardDetails.cvv" 
                              @input="validateField('cvv')" 
                              type="password" 
                              maxlength="4" 
                              placeholder="•••" 
                              class="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm   focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                              :class="cardErrors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-100'"
                            />
                            <div class="absolute right-4 top-1/2 -translate-y-1/2">
                              <Lock class="h-4 w-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                            </div>
                          </div>
                          <div v-if="cardErrors.cvv" class="flex items-center gap-2 text-sm text-red-500  uppercase  ml-1 mt-1">
                            <AlertCircle class="h-3 w-3" />
                            {{ cardErrors.cvv }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Billing Details Section -->
                <div class="bg-white border border-gray-100 rounded-[2rem] overflow-visible shadow-sm hover:shadow-md transition-shadow z-[10]">
                  <div class="bg-primary text-white px-6 py-5 flex items-center gap-4 rounded-t-[2rem]">
                    <div class="flex items-center justify-center w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm text-white  text-sm">4</div>
                    <h3 class="text-sm  ">Billing Particulars</h3>
                  </div>
                  
                  <div class="bg-white text-gray-900 p-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div class="space-y-3 md:col-span-2">
                        <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">Street Address</label>
                        <GoogleAddressAutocomplete 
                          v-model="form.billingDetails.address" 
                          label="Address Lookup"
                          placeholder="Search for your street..."
                          :api-key="runtimeConfig.public.googleMapsApiKey"
                          @address-selected="handleAddressSelected"
                        />
                      </div>
                      <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">Country</label>
                        <SelectInput 
                          v-model="form.billingDetails.country" 
                          label="Select Country"
                          :options="countriesOptions"
                          :loading="loadingLocations.countries"
                          @update:modelValue="handleCountryChange"
                        />
                      </div>
                      <div class="space-y-3">
                         <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">State / Province</label>
                         <SelectInput 
                          v-model="form.billingDetails.state" 
                          label="Select State"
                          :options="statesOptions"
                          :loading="loadingLocations.states"
                          :disabled="!form.billingDetails.country"
                          @update:modelValue="handleStateChange"
                        />
                      </div>
                      <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">City</label>
                        <SelectInput 
                          v-model="form.billingDetails.city" 
                          label="Select City"
                          :options="citiesOptions"
                          :loading="loadingLocations.cities"
                          :disabled="!form.billingDetails.state"
                        />
                      </div>
                      <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-800 uppercase  ml-1">Postal Code</label>
                        <input v-model="form.billingDetails.postalCode" type="text" class="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-5 text-sm font-bold focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Terms and Disclaimer -->
                <div class="space-y-6">
                  <div class="text-sm text-gray-800 font-medium leading-relaxed text-justify">
                    <strong class="text-gray-900 uppercase">TICKETING DISCLAIMER:</strong> By selecting Credit Card or Cash/Check payment option and confirming booking you are unconditionally liable to pay for the same. Under no circumstances shall your failure to collect payment from any of your customers, excuse, limit, reduce or release you from your obligation to pay Flybeth Travel & Tours for your order and/or booking. If you do not receive your confirmation including ticket numbers within 30 minutes—please email ticketing@flybeth.com regarding status. A $25 service fee is charged for any refunded ticket (in addition to recall of commission). A $25 service fee is charged for tickets that are reissued at the request of passenger/agent. Tickets reissued due to schedule change do not incur this service fee. A $10 service fee is charged for eligible tickets that are voided within 24-hours of issuance.
                  </div>

                  <label class="flex items-start gap-4 cursor-pointer group bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <input type="checkbox" v-model="form.acknowledgement" class="mt-0.5 h-5 w-5 rounded text-primary focus:ring-primary border-gray-300" />
                    <span class="text-sm font-bold text-gray-900">I acknowledge that I have read and accept all the terms and conditions as well as the fare rules for each flight segment on this itinerary.</span>
                  </label>
                </div>

              </div>
            </div>

            <!-- Right Column: Persistent Sidebar -->
            <div class="lg:col-span-4 sticky lg:top-8 space-y-8">
              <div class="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                <h4 class="text-sm  text-gray-900 uppercase  mb-10 pb-4 border-b border-gray-50">Payment Summary</h4>
                <div class="space-y-6">
                  <div class="flex justify-between items-center text-sm font-medium text-gray-800 uppercase ">
                    <span>Base Fare (Net)</span>
                    <span class="text-gray-900">{{ formatPrice(selectedFlight?.price) }}</span>
                  </div>
                  <div class="flex justify-between items-center text-sm font-medium text-gray-800 uppercase ">
                    <span>Initial Commission</span>
                    <span class="text-emerald-500  ">+{{ formatPrice(selectedFlight?.priceWithCommission - selectedFlight?.price) }}</span>
                  </div>
                  <div v-if="form.agentServiceFee" class="flex justify-between items-center text-sm font-medium text-gray-800 uppercase ">
                    <span>Agent Service Fee</span>
                    <span class="text-gray-900  ">+{{ formatPrice(form.agentServiceFee) }}</span>
                  </div>
                  <div v-if="form.adultMarkup" class="flex justify-between items-center text-sm font-medium text-gray-800 uppercase ">
                    <span>Custom Markups</span>
                    <span class="text-gray-900  ">+{{ formatPrice(form.adultMarkup * travelers.adults) }}</span>
                  </div>
                  <div v-if="form.hasInsurance" class="flex justify-between items-center text-sm font-medium text-gray-800 uppercase ">
                    <span>Travel Protection</span>
                    <span class="text-gray-900  ">+{{ formatPrice(25 * travelers.adults) }}</span>
                  </div>
                  <div v-if="seatPrice" class="flex justify-between items-center text-sm font-medium text-gray-800 uppercase ">
                    <span>Seat Selection</span>
                    <span class="text-gray-900  ">+{{ formatPrice(seatPrice) }}</span>
                  </div>
                  
                  <div class="pt-8 border-t-2 border-dashed border-gray-100 mt-8">
                    <div class="flex justify-between items-end">
                      <p class="text-sm font-semibold text-gray-800 uppercase ">Amount Due</p>
                      <p class="text-2xl  text-gray-900 er leading-none">{{ formatPrice(totalAmount) }}</p>
                    </div>
                    <p class="text-sm font-bold text-emerald-500 uppercase  mt-2 text-right italic">Guaranteed Payment</p>
                  </div>
                </div>
              </div>
              <p class="text-center text-sm font-medium text-gray-800 uppercase ">Secure Agent Pipeline • Offer Ref: {{ selectedFlight?.offerId?.slice(-8) }}</p>
            </div>
          </div>

          <!-- Step 4: Confirmation -->
          <div v-if="currentStep === 'confirmation'" class="text-center space-y-12 animate-in zoom-in-50 duration-1000">
             <div class="w-32 h-32 rounded-[2.5rem] bg-green-500/10 flex items-center justify-center mx-auto animate-bounce">
                <CheckBadgeIcon class="h-20 w-20 text-green-500" />
             </div>
             <div>
                <h3 class="text-5xl  text-gray-900 mb-4 ">Booking Secured!</h3>
                <p class="text-sm text-gray-800">Your trip is manifested. Reference # {{ bookingRef }}</p>
             </div>

             <div class="inline-flex items-center space-x-4 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                <div class="text-left pr-12 border-r border-gray-200">
                   <p class="text-sm font-medium text-gray-800 uppercase ">Notification Status</p>
                   <p class="text-sm font-bold text-gray-900 mt-1">Invoice Sent to Agent & Admin</p>
                </div>
                <div class="text-left pl-8">
                   <p class="text-sm font-medium text-gray-800 uppercase ">Generated PNR</p>
                   <p class="text-sm  text-primary  mt-1">{{ bookingRef }}</p>
                </div>
             </div>

             <div class="pt-8">
                <BaseButton @click="$emit('close')" variant="primary" size="lg" class="px-16 h-16 rounded-3xl">Go to Bookings Dashboard</BaseButton>
             </div>
          </div>

        </div>
      </div>

      <!-- Sticky Action Footer -->
      <div v-if="currentStep !== 'confirmation'" class="px-4 lg:px-12 py-4 lg:py-5 bg-white border-t border-gray-100 shrink-0 flex items-center justify-between sticky bottom-0 z-[10]">
        <BaseButton 
          v-if="currentStepIndex > 0" 
          @click="prevStep" 
          variant="secondary" 
          class="h-11 lg:h-12 px-5 lg:px-8 rounded-2xl group border-gray-100 shrink-0"
        >
          <ChevronLeftIcon class="h-5 w-5 lg:mr-3 group-hover:-translate-x-1 transition-transform" />
          <span class="hidden sm:inline text-sm font-semibold">Back</span>
        </BaseButton>
        <div v-else></div>

        <div class="flex items-center space-x-4 lg:space-x-8">
           <div class="text-right hidden sm:block">
             <p class="text-sm font-semibold text-gray-800 uppercase  mb-1">Amount Due</p>
             <p class="text-sm lg:text-lg  text-gray-900 er">{{ formatPrice(totalAmount) }}</p>
           </div>
           
           <BaseButton 
            @click="nextStep" 
            :loading="isProcessing" 
            variant="primary" 
            size="lg" 
            class="h-11 lg:h-12 px-6 lg:px-10 rounded-2xl group shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <span class="text-sm font-bold shrink-0">{{ currentStepIndex === steps.length - 2 ? 'Confirm Booking' : 'Next Step' }}</span>
            <ChevronRight v-if="currentStepIndex < steps.length - 2" class="h-5 w-5 ml-4 group-hover:translate-x-1 transition-transform" />
            <Sparkles v-else class="h-5 w-5 ml-4" />
          </BaseButton>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  UserIcon,
  IdentificationIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  PlusIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  CreditCardIcon
} from '@heroicons/vue/24/outline'
import axios from 'axios'

import { 
  Plane,
  Check,
  X,
  ChevronRight,
  Sparkles,
  Lock,
  AlertCircle
} from 'lucide-vue-next'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import BirthDatePicker from '@/components/ui/BirthDatePicker.vue'
import SelectInput from '@/components/ui/SelectInput.vue'
import GoogleAddressAutocomplete from '@/components/ui/GoogleAddressAutocomplete.vue'
import PhoneNumberInput from '@/components/ui/PhoneNumberInput.vue'
import SeatSelectionUI from '@/components/flights/SeatSelectionUI.vue'
import { useBookings } from '@/composables/modules/bookings/useBookings'
import { useSettings } from '@/composables/useSettings'
import { useCustomToast } from '@/composables/core/useCustomToast'

const { formatPrice, currentCurrency } = useSettings()

const props = defineProps({
  selectedFlight: { type: Object, required: true },
  travelers: { type: Object, required: true }
})

const emit = defineEmits(['close'])
const { createBooking } = useBookings()
const { showToast } = useCustomToast()
const runtimeConfig = useRuntimeConfig()

const nations = ref<any[]>([])
const provinces = ref<any[]>([])
const municipalities = ref<any[]>([])

const loadingLocations = ref({
  countries: false,
  states: false,
  cities: false
})

const countriesOptions = ref<{ label: string, value: string }[]>([])
const statesOptions = ref<{ label: string, value: string }[]>([])
const citiesOptions = ref<{ label: string, value: string }[]>([])

const fetchLocations = async (type: 'countries' | 'states' | 'cities', params?: any) => {
  loadingLocations.value[type] = true
  try {
    const baseUrl = 'https://countriesnow.space/api/v0.1/countries'
    
    if (type === 'countries') {
       const res = await axios.get(`${baseUrl}/iso`)
       countriesOptions.value = res.data.data.map((c: any) => ({
         label: c.name,
         value: c.Iso2
       }))
       nations.value = res.data.data
    } else if (type === 'states') {
       const res = await axios.post(`${baseUrl}/states`, { country: params.country })
       statesOptions.value = res.data.data.states.map((s: any) => ({
         label: s.name,
         value: s.name // Using name because subsequent city fetch needs the state name
       }))
       provinces.value = res.data.data.states
    } else if (type === 'cities') {
       const res = await axios.post(`${baseUrl}/state/cities`, { country: params.country, state: params.state })
       citiesOptions.value = res.data.data.map((c: any) => ({
         label: c,
         value: c
       }))
    }
  } catch (error) {
    console.error(`Failed to fetch ${type}`, error)
  } finally {
    loadingLocations.value[type] = false
  }
}

const handleCountryChange = () => {
  form.value.billingDetails.state = ''
  form.value.billingDetails.city = ''
  const selectedCountryName = countriesOptions.value.find(c => c.value === form.value.billingDetails.country)?.label
  if (selectedCountryName) fetchLocations('states', { country: selectedCountryName })
}

const handleStateChange = () => {
  form.value.billingDetails.city = ''
  const selectedCountryName = countriesOptions.value.find(c => c.value === form.value.billingDetails.country)?.label
  const selectedStateName = form.value.billingDetails.state // We used name as value
  if (selectedCountryName && selectedStateName) fetchLocations('cities', { country: selectedCountryName, state: selectedStateName })
}

const handleAddressSelected = (data: any) => {
  form.value.billingDetails.address = data.address
  const countryComp = data.components.find((c: any) => c.types.includes('country'))
  const stateComp = data.components.find((c: any) => c.types.includes('administrative_area_level_1'))
  const cityComp = data.components.find((c: any) => c.types.includes('locality'))
  
  if (countryComp) {
    form.value.billingDetails.country = countryComp.short_name
    handleCountryChange()
    if (stateComp) {
      setTimeout(() => {
        form.value.billingDetails.state = stateComp.short_name
        handleStateChange()
        if (cityComp) {
          setTimeout(() => {
            form.value.billingDetails.city = cityComp.long_name
          }, 800)
        }
      }, 800)
    }
  }
}

const agentWallet = ref({ balance: 0 })

const fetchWallet = async () => {
  try {
    const res = await axios.get(`${runtimeConfig.public.apiBase}/finance/wallet/balance`, {
       headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    })
    agentWallet.value.balance = res.data
  } catch (err) {
    console.error('Failed to fetch wallet', err)
  }
}

const addPassenger = () => {
  form.value.passengers.push({
    firstName: '',
    lastName: '',
    dob: '',
    passport: '',
    email: '',
    phone: '',
    gender: 'male',
    title: 'mr'
  })
}

const removePassenger = (index: number) => {
  if (form.value.passengers.length > 1) {
    form.value.passengers.splice(index, 1)
  }
}

onMounted(async () => {
  fetchWallet()
  
  // Auto-detect location for billing details
  try {
    const { data } = await axios.get('https://ipapi.co/json/')
    if (data && data.country_code) {
      if (!form.value.billingDetails.country) {
        form.value.billingDetails.country = data.country_code
        handleCountryChange()
      }
    }
  } catch (e) {
    console.warn('Geolocation prefill failed', e)
  }
  fetchLocations('countries')
})

const totalAmount = computed(() => {
  const base = props.selectedFlight.priceWithCommission || props.selectedFlight.price
  const count = form.value.passengers.length
  const agentFee = Number(form.value.agentServiceFee) || 0
  const markup = (Number(form.value.adultMarkup) || 0) * count
  const insurance = form.value.hasInsurance ? 25 * count : 0
  const seats = seatPrice.value || 0
  return base + agentFee + markup + insurance + seats
})

const seatPrice = ref(0)
const steps = [
  { id: 'cart', title: 'Details', desc: 'Traveler Info' },
  { id: 'seats', title: 'Seats', desc: 'Pick your Spot' },
  { id: 'review', title: 'Summary', desc: 'Final Review' },
  { id: 'payment', title: 'Payment', desc: 'Secure Method' },
  { id: 'confirmation', title: 'Ready', desc: 'Booking Secured' }
]

const currentStepIndex = ref(0)
const currentStep = computed(() => steps[currentStepIndex.value].id)

const isProcessing = ref(false)
const bookingRef = ref('')

const form = ref({
  passengers: Array.from({ length: props.travelers.adults }, () => ({
    firstName: '',
    lastName: '',
    dob: '',
    passport: '',
    email: '',
    phone: '',
    gender: 'male',
    title: 'mr'
  })),
  agentServiceFee: 50,
  adultMarkup: 100,
  hasInsurance: false,
  paymentMethod: 'wallet',
  cardDetails: {
    name: '',
    number: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  },
  billingDetails: {
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  },
  acknowledgement: false,
  services: []
})

const expiryMonths = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1).padStart(2, '0'),
  value: i + 1
}))

const expiryYears = Array.from({ length: 10 }, (_, i) => ({
  label: String(new Date().getFullYear() + i),
  value: new Date().getFullYear() + i
}))

const cardErrors = ref({
  name: '',
  number: '',
  expMonth: '',
  expYear: '',
  cvv: ''
})

const validateLuhn = (num: string) => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x))
  let lastDigit = arr.shift()
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)), 0)
  sum += lastDigit!
  return sum % 10 === 0
}

const handleCardInput = () => {
  // Aggressively format card number with spaces as typing
  let val = form.value.cardDetails.number.replace(/\D/g, '')
  if (val.length > 16) val = val.slice(0, 16)
  
  // Format into chunks of 4
  const chunks = val.match(/.{1,4}/g)
  form.value.cardDetails.number = chunks ? chunks.join(' ') : val
  
  validateField('number')
}

const validateField = (field: string) => {
  const details = form.value.cardDetails
  const rawNumber = details.number.replace(/\s+/g, '')

  if (field === 'name') {
    cardErrors.value.name = !details.name ? 'Cardholder name is mandatory' : ''
  }
  if (field === 'number') {
    if (!rawNumber) cardErrors.value.number = 'Please enter card number'
    else if (rawNumber.length < 13) cardErrors.value.number = 'Incomplete card number'
    else if (!validateLuhn(rawNumber)) cardErrors.value.number = 'Invalid card number sequence'
    else cardErrors.value.number = ''
  }
  if (field === 'cvv') {
    if (!details.cvv) cardErrors.value.cvv = 'CVV required'
    else if (details.cvv.length < 3) cardErrors.value.cvv = '3 or 4 digits'
    else cardErrors.value.cvv = ''
  }
  if (field === 'expMonth') {
    cardErrors.value.expMonth = !details.expMonth ? 'Required' : ''
  }
  if (field === 'expYear') {
    cardErrors.value.expYear = !details.expYear ? 'Required' : ''
  }
}

const validateCardForm = () => {
  validateField('name')
  validateField('number')
  validateField('cvv')
  cardErrors.value.expMonth = !form.value.cardDetails.expMonth ? 'Required' : ''
  cardErrors.value.expYear = !form.value.cardDetails.expYear ? 'Required' : ''

  return !Object.values(cardErrors.value).some(v => v !== '')
}

const formatTime = (dateStr: string) => {
  if (!dateStr) return '--:--'
  if (dateStr.length < 10) return dateStr // Already formatted
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

const nextStep = async () => {
  if (currentStep.value === 'payment' && form.value.paymentMethod === 'credit_card_immediate') {
    if (!validateCardForm()) {
      showToast({ title: 'Payment Error', message: 'Please correct the highlighted errors in your card details.', toastType: 'error' })
      return
    }
  }

  if (currentStepIndex.value === steps.length - 2) {
    if (!form.value.acknowledgement) {
      showToast({ title: 'Validation Error', message: 'You must acknowledge the terms and conditions to proceed.', toastType: 'error' })
      return
    }
    // Finalize
    await handleBooking()
  } else if (currentStepIndex.value < steps.length - 2) {
    currentStepIndex.value++
  }
}

const prevStep = () => {
  if (currentStepIndex.value > 0) currentStepIndex.value--
}

const handleBooking = async () => {
  if (form.value.paymentMethod === 'wallet' && agentWallet.value.balance < totalAmount.value) {
    showToast({ title: 'Insufficient Funds', message: 'Your wallet balance is lower than the booking total. Please top up.', toastType: 'error' })
    return
  }

  isProcessing.value = true
  try {
    const payload = {
      flights: [{
        flightId: String(props.selectedFlight?.id || props.selectedFlight?.offerId || 'default-flight-id'),
        class: props.selectedFlight?.cabinClass || 'ECONOMY',
        passengerIds: [],
        offerId: props.selectedFlight?.offerId,
        provider: props.selectedFlight?.provider
      }],
      passengerDetails: form.value.passengers.map(p => ({
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        phone: p.phone,
        dateOfBirth: p.dob,
        gender: p.gender,
        title: p.title
      })),
      contactDetails: {
        email: form.value.passengers[0]?.email || '',
        phone: form.value.passengers[0]?.phone || '',
        name: `${form.value.passengers[0]?.firstName} ${form.value.passengers[0]?.lastName}`,
        state: form.value.billingDetails.state || undefined
      },
      agentServiceFee: Number(form.value.agentServiceFee) || 0,
      adultMarkup: Number(form.value.adultMarkup) || 0,
      hasInsurance: form.value.hasInsurance,
      paymentModel: form.value.paymentMethod === 'wallet' ? 'pay_now' : 'on_hold',
      paymentProvider: form.value.paymentMethod,
      currency: currentCurrency.value.code,
      services: form.value.services
    }

    const res = await createBooking(payload)
    if (res) {
      bookingRef.value = res.pnr
      currentStepIndex.value = steps.length - 1
      showToast({ title: 'Success', message: 'Booking completed successfully!', toastType: 'success' })
      // Refresh wallet balance after booking
      fetchWallet()
    }
  } catch (error: any) {
    console.error(error)
    const msg = error.response?.data?.message || 'Failed to process booking.'
    showToast({ title: 'Booking Failed', message: msg, toastType: 'error' })
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #CBD5E1;
}

@keyframes pulse-soft {
  0% { box-shadow: 0 0 0 0 rgba(13, 29, 173, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(13, 29, 173, 0); }
  100% { box-shadow: 0 0 0 0 rgba(13, 29, 173, 0); }
}

.animate-pulse-soft {
  animation: pulse-soft 2s infinite;
}
</style>
