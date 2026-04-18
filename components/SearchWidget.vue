<template>
  <div 
    class="bg-white/95 backdrop-blur-xl shadow-xl shadow-primary/8 border border-gray-100 font-body relative z-10 transition-all duration-700 ease-in-out rounded-[2rem]"
  >
    <!-- Redesigned Tabs — Desktop Horizontal / Mobile Grid -->
    <div class="bg-white border-b border-gray-50 overflow-hidden">
      <!-- Mobile Grid Selector (Hidden on Desktop) -->
      <div class="md:hidden grid grid-cols-4 gap-2 p-3 bg-gray-50/50">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="currentTab = tab.name"
          :class="[
            currentTab === tab.name
              ? 'bg-primary-dark text-white shadow-lg scale-95'
              : 'bg-white text-gray-400 hover:text-gray-900 border-gray-100',
            'flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all duration-300 border shadow-sm',
          ]"
        >
          <div class="flex items-center justify-center h-5">
            <img v-if="tab.customIcon" :src="tab.customIcon" class="h-4 w-4 object-contain transition-all" :class="currentTab === tab.name ? 'brightness-0 invert' : 'opacity-60'" />
            <component v-else :is="tab.icon" class="h-4 w-4 stroke-[2.5]" />
          </div>
          <span class="text-[9px] font-bold  ">{{ tab.label || tab.name }}</span>
        </button>
      </div>

      <!-- Desktop Nav (Hidden on Mobile) -->
      <nav class="hidden md:flex justify-center px-6 gap-3 min-w-max w-full mx-auto" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="currentTab = tab.name"
          :class="[
            currentTab === tab.name
              ? 'text-primary-dark border-primary-dark'
              : 'text-gray-400 hover:text-gray-900 border-transparent',
            'flex flex-col items-center justify-center gap-1 transition-all border-b-[3px] pt-3 pb-2.5 relative z-10 whitespace-nowrap px-4',
          ]"
        >
          <div class="flex items-center justify-center h-8">
            <img v-if="tab.customIcon" :src="tab.customIcon" class="h-5 w-5 object-contain transition-all" :class="currentTab === tab.name ? 'opacity-100' : 'opacity-40 grayscale'" />
            <component v-else :is="tab.icon" class="h-5 w-5 stroke-[2]" />
          </div>
          <span class="text-[11px]  font-bold ">{{ tab.label || tab.name }}</span>
        </button>
      </nav>
    </div>

    <!-- Backdrop Overlay -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isFocused" class="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-[9]" @click="isFocused = false"></div>
      </Transition>
    </Teleport>

    <!-- Content Area -->
    <div 
      class="bg-white p-4 md:p-6 space-y-4 relative z-[10000]"
    >
       <!-- Stays (Hotels) Panel -->
       <div v-if="currentTab === 'Hotels'" class="space-y-6">
         <!-- Stay Mode Toggle -->
         <div class="flex items-center space-x-8 pb-2">
           <label 
             v-for="mode in [{label: 'Single Hotel', value: 'single'}, {label: 'Multi Hotel', value: 'multi'}]" 
             :key="mode.value"
             class="flex items-center space-x-3 cursor-pointer group"
           >
             <div class="relative flex items-center">
               <input type="radio" :value="mode.value" v-model="stayMode" class="sr-only" />
               <div 
                 class="w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                 :class="stayMode === mode.value ? 'border-primary-dark' : 'border-gray-200 group-hover:border-gray-400'"
               >
                 <div 
                   class="w-2.5 h-2.5 rounded-full bg-primary-dark transition-all duration-300"
                   :class="stayMode === mode.value ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
                 ></div>
               </div>
             </div>
             <span class="text-[10px] font-bold   text-gray-500 transition-colors" :class="stayMode === mode.value ? 'text-primary-dark' : 'opacity-60 group-hover:opacity-100'">{{ mode.label }}</span>
           </label>
         </div>
 
         <!-- Single Hotel Layout -->
         <div v-if="stayMode === 'single'" class="space-y-6">
           <div 
             class="flex flex-col md:flex-row items-stretch bg-white border border-gray-200 rounded-2xl shadow-sm overflow-visible transition-all duration-300"
             :class="isFocused ? 'ring-4 ring-primary-dark/5 border-primary-dark' : ''"
           >
             <div class="flex-[1.5] relative border-b md:border-b-0 md:border-r border-gray-100">
               <LocationPicker 
                 v-model="searchState.location" 
                 label="Going to"
                 placeholder="Where are you going?"
                 @focus="isFocused = true"
                 @close="isFocused = false"
               />
             </div>
             <div class="flex-[1.8] border-b md:border-b-0 md:border-r border-gray-100">
               <FlightDateRangePicker
                 v-model:departure="searchState.checkIn"
                 v-model:return="searchState.checkOut"
                 mode="roundtrip"
                 @focus="isFocused = true"
                 @close="isFocused = false"
               />
             </div>
             <div class="flex-1 relative border-gray-100">
                <Occupancypicker
                  v-model:rooms="occupancy.rooms"
                  v-model:adults="occupancy.adults"
                  v-model:children="occupancy.children"
                  @focus="isFocused = true"
                  @close="isFocused = false"
                />
             </div>
           </div>
           <div class="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-50">
             <div class="flex items-center gap-6">
               <div class="flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                 <span class="text-[10px] font-bold text-gray-400   mr-4">Bundle + Save</span>
                 <label class="flex items-center text-[11px] font-bold text-gray-900 cursor-pointer mr-4  er">
                   <input type="checkbox" v-model="bundles.bundleFlight" class="mr-2 custom-checkbox" />
                   + Flight
                 </label>
                 <label class="flex items-center text-[11px] font-bold text-gray-900 cursor-pointer  er">
                   <input type="checkbox" v-model="bundles.bundleCar" class="mr-2 custom-checkbox" />
                   + Car
                 </label>
               </div>
             </div>
             <button @click="handleSearch" class="w-full md:w-auto bg-primary-dark text-white px-6 py-2.5 text-[11px] rounded-xl font-bold text-[11px]   shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2">
               <span>Find Your Hotel</span>
               <ArrowRightIcon class="h-4 w-4" />
             </button>
           </div>
         </div>

        <!-- Multi Hotel Layout -->
        <div v-else class="space-y-6">
          <div v-for="(hotel, index) in multiHotelLegs" :key="index" class="space-y-2">
            <p class="text-[11px] font-bold text-primary-dark ">Hotel {{ index + 1 }}</p>
            <div class="flex flex-col md:flex-row items-stretch bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div class="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                <LocationPicker v-model="hotel.location" label="Where to?" />
              </div>
              <div class="flex-1 border-b md:border-b-0 border-gray-100">
                <FlightDateRangePicker v-model:departure="hotel.checkIn" v-model:return="hotel.checkOut" mode="roundtrip" />
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-gray-50">
            <button @click="addHotelLeg" v-if="multiHotelLegs.length < 5" class="bg-gray-50 text-gray-900 px-6 py-2.5 rounded-xl text-[11px] font-bold   transition-all border border-gray-100">Add Another Hotel</button>
            <button @click="handleSearch" class="bg-primary-dark text-white px-6 py-2.5 text-[11px] rounded-xl font-bold text-[11px]   shadow-lg flex items-center justify-center gap-2">
              <span>Find Your Hotels</span>
              <ArrowRightIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Flights Panel -->
      <div v-if="currentTab === 'Flights'" class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
           <div class="flex items-center space-x-6">
              <label v-for="mode in ['oneway', 'roundtrip', 'multicity']" :key="mode" class="flex items-center space-x-2 cursor-pointer group">
                <input type="radio" :value="mode" v-model="flightMode" class="sr-only" />
                <div class="w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center" :class="flightMode === mode ? 'border-primary-dark' : 'border-gray-300'">
                   <div v-if="flightMode === mode" class="w-2 h-2 rounded-full bg-primary-dark"></div>
                </div>
                <span class="text-[11px]  " :class="flightMode === mode ? 'text-primary-dark' : 'text-gray-500/60'">{{ mode.replace('multicity', 'Multi City').replace('oneway', 'One Way').replace('roundtrip', 'Round Trip') }}</span>
              </label>
           </div>
        </div>
        <div class="flex flex-col gap-4">
           <div 
             v-for="(leg, index) in flightMode === 'multicity' ? multiFlightLegs : [flightSearchState]" 
             :key="index"
             class="flex flex-col lg:flex-row w-full bg-white border border-gray-200 rounded-xl shadow-sm relative transition-all duration-300 hover:border-primary/20"
           >
              <div class="flex flex-col md:flex-row w-full lg:w-[60%]">
                <div class="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100">
                   <LocationPicker v-model="leg.origin" label="From" />
                </div>
                <div class="w-full md:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-100">
                   <LocationPicker v-model="leg.destination" label="To" />
                </div>
              </div>
              <div class="flex flex-col md:flex-row w-full lg:w-[42%]">
                <div class="flex-1 border-b md:border-b-0 md:border-r border-gray-100 min-w-max">
                  <FlightDateRangePicker :mode="flightMode === 'multicity' ? 'oneway' : (flightMode as any)" v-model:departure="leg.departureDate" v-model:return="leg.returnDate" />
                </div>
                <div v-if="index === 0" class="w-full md:w-[220px] shrink-0">
                  <Occupancypicker label="Passengers" variant="flight" v-model:adults="flightTravelers.adults" v-model:children="flightTravelers.children" />
                </div>
              </div>
           </div>
        </div>
        <div class="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-50">
              <div class="flex items-center gap-6">
                <div class="flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <span class="text-[10px] font-bold text-gray-400   mr-4">Bundle + Save</span>
                  <label class="flex items-center text-[11px] font-bold text-gray-900 cursor-pointer mr-4  er">
                    <input type="checkbox" v-model="bundles.bundleHotel" class="mr-2 custom-checkbox" />
                    + Hotel
                  </label>
                  <label class="flex items-center text-[11px] font-bold text-gray-900 cursor-pointer  er">
                    <input type="checkbox" v-model="bundles.bundleCar" class="mr-2 custom-checkbox" />
                    + Car
                  </label>
                </div>
                <p class="text-[10px] font-bold text-primary    hidden lg:block">Agent Wholesale Pricing Active</p>
              </div>
              <button @click="handleSearch" class="w-full md:w-auto bg-primary-dark text-white px-6 py-2.5 text-[11px] rounded-xl font-bold text-[11px]   shadow-lg flex items-center justify-center gap-2">
                <span>Find Your Flight</span>
                <ArrowRightIcon class="h-4 w-4" />
              </button>
        </div>
      </div>

      <!-- Packages Panel -->
      <div v-if="currentTab === 'Packages'" class="space-y-6">
        <div class="flex flex-wrap items-center gap-6 pb-2">
          <label 
            v-for="mode in [
              {label: 'Hotel + Flight', value: 'Hotel+Flight'}, 
              {label: 'Hotel + Flight + Car', value: 'Hotel+Flight+Car'},
              {label: 'Flight + Car', value: 'Flight+Car'},
              {label: 'Hotel + Car', value: 'Hotel+Car'}
            ]" 
            :key="mode.value"
            class="flex items-center space-x-2 cursor-pointer group"
          >
            <input type="radio" :value="mode.value" v-model="packageType" class="sr-only" />
            <div class="w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center" :class="packageType === mode.value ? 'border-primary-dark' : 'border-gray-200'">
              <div v-if="packageType === mode.value" class="w-2 h-2 rounded-full bg-primary-dark"></div>
            </div>
            <span class="text-[11px] font-bold  " :class="packageType === mode.value ? 'text-primary-dark' : 'text-gray-500/60'">{{ mode.label }}</span>
          </label>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[72px]">
            <div class="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
               <LocationPicker v-model="packageSearchState.origin" label="From" />
            </div>
            <div class="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
               <LocationPicker v-model="packageSearchState.destination" label="To" />
            </div>
            <div class="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
               <FlightDateRangePicker v-model:departure="packageSearchState.departureDate" v-model:return="packageSearchState.returnDate" mode="roundtrip" />
            </div>
            <div class="flex-1">
               <Occupancypicker v-model:rooms="packageOccupancy.rooms" v-model:adults="packageOccupancy.adults" />
            </div>
          </div>
          
          <div class="flex flex-wrap items-center gap-6 pt-2">
            <label v-if="packageType.toLowerCase().includes('hotel') && packageType.toLowerCase().includes('flight')" class="flex items-center text-[11px] font-bold text-gray-900 cursor-pointer  er">
              <input type="checkbox" v-model="onlyPartialHotel" class="mr-2 custom-checkbox" />
              I only need a hotel for part of my stay
            </label>
          </div>

          <Transition name="fade">
            <div v-if="onlyPartialHotel" class="bg-gray-50/50 p-4 rounded-xl border border-gray-100 mt-2 w-full">
              <p class="text-[10px] font-bold  text-gray-900  mb-3">Hotel Stay Dates</p>
              <div class="max-w-md bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-[68px]">
                 <FlightDateRangePicker v-model:departure="packageSearchState.hotelCheckIn" v-model:return="packageSearchState.hotelCheckOut" mode="roundtrip" />
              </div>
            </div>
          </Transition>

          <div class="flex items-center justify-between pt-4 border-t border-gray-50">
             <div class="flex items-center gap-4">
                <span class="text-[10px] font-bold text-gray-400   ">Agent Exclusive Bundles</span>
             </div>
              <button @click="handleSearch" class="bg-primary-dark text-white px-6 py-2.5 text-[11px] rounded-xl font-bold text-[11px]   shadow-lg flex items-center justify-center gap-2">
                <span>Find Your Trip</span>
                <ArrowRightIcon class="h-4 w-4" />
              </button>
          </div>
        </div>
      </div>

      <!-- Cars Panel -->
      <div v-if="currentTab === 'Cars'" class="space-y-6">
        <div class="flex rounded-xl overflow-hidden border border-gray-200 p-1 bg-gray-50">
          <button @click="carMode = 'pickup'" class="flex-1 py-1 text-[11px] font-bold   rounded-lg transition-all" :class="carMode === 'pickup' ? 'bg-primary-dark text-white shadow-md' : 'bg-transparent text-gray-500 hover:text-gray-900'">Airport Pick-up</button>
          <button @click="carMode = 'dropoff'" class="flex-1 py-1 text-[11px] font-bold   rounded-lg transition-all" :class="carMode === 'dropoff' ? 'bg-primary-dark text-white shadow-md' : 'bg-transparent text-gray-500 hover:text-gray-900'">Airport Drop-off</button>
        </div>
        <div class="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="flex-1 border-r border-gray-100">
            <LocationPicker v-model="carSearchState.origin" label="From" />
          </div>
          <div class="flex-1 border-r border-gray-100">
            <LocationPicker v-model="carSearchState.destination" label="To" />
          </div>
          <div class="flex-1">
             <FlightDateRangePicker v-model:departure="carSearchState.pickUpDate" mode="oneway" />
          </div>
        </div>
        <div class="flex justify-between pt-4 border-t border-gray-50">
           <label class="flex items-center text-[11px] font-bold text-gray-900 cursor-pointer  er">
             <input type="checkbox" v-model="differentCarDropoff" class="mr-2 custom-checkbox" />
             Drop-off at different location
           </label>
           <button @click="handleSearch" class="bg-primary-dark text-white px-6 py-2.5 text-[11px] rounded-xl font-bold text-[11px]   shadow-lg">Find Your Car</button>
        </div>
      </div>

      <!-- Cruises Panel -->
      <div v-if="currentTab === 'Cruises'" class="space-y-4">
        
        <!-- Global Dropdown Close Watcher -->
        <div v-if="activeCruiseField" class="fixed inset-0 z-40" @click="activeCruiseField = null"></div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-50">
          <!-- Destination Dropdown -->
          <div class="relative w-full">
            <button 
              @click="activeCruiseField = activeCruiseField === 'destination' ? null : 'destination'"
              class="w-full h-16 pl-14 pr-10 bg-white border border-gray-200 rounded-2xl flex items-center text-left hover:border-primary focus-within:border-primary transition-all relative z-50"
              :class="{ 'ring-4 ring-primary/5 border-primary': activeCruiseField === 'destination' }"
            >
              <div class="absolute left-5 top-1/2 -translate-y-1/2 text-primary-dark">
                <MagnifyingGlassIcon class="h-5 w-5" />
              </div>
              <span class="text-sm font-bold" :class="cruiseSearchState.destinationLabel ? 'text-gray-900' : 'text-gray-400'">{{ cruiseSearchState.destinationLabel || 'Destination (Any)' }}</span>
              <ChevronDownIcon class="absolute right-5 h-4 w-4 text-gray-400" />
            </button>

            <Transition name="fade">
              <div v-if="activeCruiseField === 'destination'" class="absolute left-0 top-full mt-2 w-full max-h-[300px] overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-xl z-[60] p-3 custom-scrollbar">
                <div v-for="opt in cruiseDestinations" :key="opt.value" 
                  @click="cruiseSearchState.destination = opt.value; cruiseSearchState.destinationLabel = opt.label; activeCruiseField = null"
                  class="px-4 py-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group flex items-center justify-between"
                  :class="{ 'bg-primary/5 text-primary-dark': cruiseSearchState.destination === opt.value }"
                >
                  <span class="text-xs font-bold text-gray-900 group-hover:text-primary-dark">{{ opt.label }}</span>
                  <CheckIcon v-if="cruiseSearchState.destination === opt.value" class="h-4 w-4 text-primary-dark" />
                </div>
              </div>
            </Transition>
          </div>

          <!-- Departing Dropdown -->
          <div class="relative w-full">
            <button 
              @click="activeCruiseField = activeCruiseField === 'departing' ? null : 'departing'"
              class="w-full h-16 pl-14 pr-10 bg-white border border-gray-200 rounded-2xl flex items-center text-left hover:border-primary focus-within:border-primary transition-all relative z-50"
              :class="{ 'ring-4 ring-primary/5 border-primary': activeCruiseField === 'departing' }"
            >
              <div class="absolute left-5 top-1/2 -translate-y-1/2 text-primary-dark">
                <CalendarIcon class="h-5 w-5" />
              </div>
              <span class="text-sm font-bold" :class="cruiseSearchState.departingLabel ? 'text-gray-900' : 'text-gray-400'">{{ cruiseSearchState.departingLabel || 'Departing Month' }}</span>
              <ChevronDownIcon class="absolute right-5 h-4 w-4 text-gray-400" />
            </button>

            <Transition name="fade">
              <div v-if="activeCruiseField === 'departing'" class="absolute left-0 top-full mt-2 w-full max-h-[300px] overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-xl z-[60] p-3 custom-scrollbar">
                <div v-for="month in cruiseMonths" :key="month.value" 
                  @click="cruiseSearchState.departingMonth = month.value; cruiseSearchState.departingLabel = month.label; activeCruiseField = null"
                  class="px-4 py-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group flex items-center justify-between"
                  :class="{ 'bg-primary/5 text-primary-dark': cruiseSearchState.departingMonth === month.value }"
                >
                  <span class="text-xs font-bold text-gray-900 group-hover:text-primary-dark">{{ month.label }}</span>
                  <CheckIcon v-if="cruiseSearchState.departingMonth === month.value" class="h-4 w-4 text-primary-dark" />
                </div>
              </div>
            </Transition>
          </div>

          <!-- Length Dropdown -->
          <div class="relative w-full">
            <button 
              @click="activeCruiseField = activeCruiseField === 'length' ? null : 'length'"
              class="w-full h-16 pl-14 pr-10 bg-white border border-gray-200 rounded-2xl flex items-center text-left hover:border-primary focus-within:border-primary transition-all relative z-50"
              :class="{ 'ring-4 ring-primary/5 border-primary': activeCruiseField === 'length' }"
            >
              <div class="absolute left-5 top-1/2 -translate-y-1/2 text-primary-dark">
                <ClockIcon class="h-5 w-5" />
              </div>
              <span class="text-sm font-bold" :class="cruiseSearchState.lengthLabel ? 'text-gray-900' : 'text-gray-400'">{{ cruiseSearchState.lengthLabel || 'Cruise Length (Any)' }}</span>
              <ChevronDownIcon class="absolute right-5 h-4 w-4 text-gray-400" />
            </button>

            <Transition name="fade">
              <div v-if="activeCruiseField === 'length'" class="absolute left-0 top-full mt-2 w-full max-h-[300px] overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-xl z-[60] p-3 custom-scrollbar">
                <div v-for="len in cruiseLengths" :key="len.value" 
                  @click="cruiseSearchState.length = len.value; cruiseSearchState.lengthLabel = len.label; activeCruiseField = null"
                  class="px-4 py-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group flex items-center justify-between"
                  :class="{ 'bg-primary/5 text-primary-dark': cruiseSearchState.length === len.value }"
                >
                  <span class="text-xs font-bold text-gray-900 group-hover:text-primary-dark">{{ len.label }}</span>
                  <CheckIcon v-if="cruiseSearchState.length === len.value" class="h-4 w-4 text-primary-dark" />
                </div>
              </div>
            </Transition>
          </div>

          <!-- Cruise Line Dropdown -->
          <div class="relative w-full">
            <button 
              @click="activeCruiseField = activeCruiseField === 'line' ? null : 'line'"
              class="w-full h-16 pl-14 pr-10 bg-white border border-gray-200 rounded-2xl flex items-center text-left hover:border-primary focus-within:border-primary transition-all relative z-50"
              :class="{ 'ring-4 ring-primary/5 border-primary': activeCruiseField === 'line' }"
            >
              <div class="absolute left-5 top-1/2 -translate-y-1/2 text-primary-dark">
                <SparklesIcon class="h-5 w-5" />
              </div>
              <span class="text-sm font-bold" :class="cruiseSearchState.lineLabel ? 'text-gray-900' : 'text-gray-400'">{{ cruiseSearchState.lineLabel || 'Cruise Line (Any)' }}</span>
              <ChevronDownIcon class="absolute right-5 h-4 w-4 text-gray-400" />
            </button>

            <Transition name="fade">
              <div v-if="activeCruiseField === 'line'" class="absolute left-0 top-full mt-2 w-full max-h-[300px] overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-xl z-[60] p-3 custom-scrollbar">
                <div v-for="line in cruiseLines" :key="line.value" 
                  @click="cruiseSearchState.line = line.value; cruiseSearchState.lineLabel = line.label; activeCruiseField = null"
                  class="px-4 py-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group flex items-center justify-between"
                  :class="{ 'bg-primary/5 text-primary-dark': cruiseSearchState.line === line.value }"
                >
                  <span class="text-xs font-bold text-gray-900 group-hover:text-primary-dark">{{ line.label }}</span>
                  <CheckIcon v-if="cruiseSearchState.line === line.value" class="h-4 w-4 text-primary-dark" />
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-gray-50 mt-4 relative z-40">
           <button @click="handleSearch" class="w-full md:w-auto bg-primary-dark text-white px-8 py-3 text-[11px] rounded-xl font-bold text-sm shadow-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
             <span>Find Cruises</span>
             <ArrowRightIcon class="h-4 w-4 text-white" />
           </button>
        </div>
      </div>

      <!-- Transfers Panel -->
      <div v-if="currentTab === 'Transfers'" class="space-y-6">
        <div class="flex rounded-xl overflow-hidden border border-gray-200 p-1 bg-gray-50">
          <button @click="transferMode = 'pickup'" class="flex-1 py-1 text-[11px] font-bold   rounded-lg transition-all" :class="transferMode === 'pickup' ? 'bg-primary-dark text-white shadow-md' : 'bg-transparent text-gray-500 hover:text-gray-900'">Airport Pick-up</button>
          <button @click="transferMode = 'dropoff'" class="flex-1 py-1 text-[11px] font-bold   rounded-lg transition-all" :class="transferMode === 'dropoff' ? 'bg-primary-dark text-white shadow-md' : 'bg-transparent text-gray-500 hover:text-gray-900'">Airport Drop-off</button>
        </div>
        <div class="flex flex-col xl:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[72px]">
          <div class="flex-1 border-b xl:border-b-0 xl:border-r border-gray-100">
             <LocationPicker v-model="transferSearchState.origin" label="From" />
          </div>
          <div class="flex-1 border-b xl:border-b-0 xl:border-r border-gray-100">
             <LocationPicker v-model="transferSearchState.destination" label="To" />
          </div>
          <div class="flex-1 border-b xl:border-b-0 xl:border-r border-gray-100">
             <FlightDateRangePicker v-model:departure="transferSearchState.date" mode="oneway" />
          </div>
          
          <div class="flex-[0.5] border-b xl:border-b-0 xl:border-r border-gray-100 relative group cursor-pointer px-4 pt-3 pb-2 flex flex-col justify-center min-h-[68px]">
            <p class="text-[11px] font-bold  text-gray-400 group-hover:text-primary-dark mb-0.5 transition-colors ">Time</p>
            <div class="flex items-center gap-2">
              <ClockIcon class="h-5 w-5 text-gray-300 shrink-0" />
              <input type="time" v-model="transferSearchState.time" class="bg-transparent text-base  text-gray-900 outline-none w-full cursor-pointer" />
            </div>
          </div>

          <div class="flex-[0.8]">
             <Occupancypicker v-model:adults="transferOccupancy.adults" v-model:children="transferOccupancy.children" label="Passengers" variant="flight" />
          </div>
        </div>
        
        <div class="flex justify-end pt-4 border-t border-gray-50">
           <button @click="handleSearch" class="w-full md:w-auto bg-primary-dark text-white px-6 py-2.5 text-[11px] rounded-xl font-bold text-[11px]   shadow-lg hover:bg-black transition-colors">Find Transfer</button>
        </div>
      </div>

      <!-- Activities Panel -->
      <div v-if="currentTab === 'Activities'" class="space-y-6">
        <div class="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[72px]">
          <div class="flex-[1.5] border-b md:border-b-0 md:border-r border-gray-100">
             <CityPicker v-model="activitiesSearchState.destination" label="Destination" placeholder="Search a city..." />
          </div>
          <div class="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
             <FlightDateRangePicker v-model:departure="activitiesSearchState.date" mode="oneway" />
          </div>
          <div class="flex-[0.8] px-4 pt-3 pb-2 flex flex-col justify-center min-h-[68px]">
            <p class="text-[11px] font-bold  text-gray-400 mb-0.5 ">Type</p>
            <p class="text-base  text-gray-900 truncate">All Activities</p>
          </div>
        </div>
        
        <div class="flex justify-end pt-4 border-t border-gray-50">
           <button @click="handleSearch" class="w-full md:w-auto bg-primary-dark text-white px-6 py-2.5 text-[11px] rounded-xl font-bold text-[11px]   shadow-lg hover:bg-black transition-colors">Find Things to Do</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { 
  ArrowRightIcon,
  TruckIcon, 
  BuildingOfficeIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  CalendarIcon,
  ClockIcon,
  GiftIcon,
  GlobeAltIcon,
  CheckIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'

import { useTracking } from '@/composables/core/useTracking'

const props = defineProps({
  defaultTab: { type: String, default: 'Flights' }
})

const { trackAction } = useTracking()
const isFocused = ref(false)
const activeCruiseField = ref<string | null>(null)

// Icons ported from user app
import flightIcon from '@/assets/icons/light__flight.svg'
import hotelIcon from '@/assets/icons/light__bed.svg'
import carIcon from '@/assets/icons/light__car.svg'
import packageIcon from '@/assets/icons/light__package.svg'
import cruiseIcon from '@/assets/icons/light__cruise.svg'
import activityIcon from '@/assets/icons/light__ticket.svg'

const tabs = [
  { name: 'Flights', label: 'Flights', customIcon: flightIcon },
  { name: 'Hotels', label: 'Hotels', customIcon: hotelIcon },
  { name: 'Transfers', label: 'Transfers', icon: TruckIcon },
  { name: 'Activities', label: 'Activities', customIcon: activityIcon },
  { name: 'Cars', label: 'Car Rentals', customIcon: carIcon },
  { name: 'Packages', label: 'Packages', customIcon: packageIcon },
  { name: 'Cruises', label: 'Cruises', customIcon: cruiseIcon }
]

const currentTab = ref(props.defaultTab)
const stayMode   = ref('single')
const flightMode = ref('roundtrip')
const carMode    = ref('pickup')
const packageType = ref('Hotel+Flight')
const onlyPartialHotel = ref(false)

const multiHotelLegs = ref([{ location: '', checkIn: '', checkOut: '' }])
const addHotelLeg = () => { if (multiHotelLegs.value.length < 5) multiHotelLegs.value.push({ location: '', checkIn: '', checkOut: '' }) }

const occupancy = reactive({ rooms: 1, adults: 2, children: 0 })
const searchState = reactive({ location: '', checkIn: '', checkOut: '' })
const bundles = reactive({ bundleFlight: false, bundleHotel: false, bundleCar: false })

const flightTravelers = reactive({ adults: 1, children: 0 })
const flightSearchState = reactive({ origin: '', destination: '', departureDate: '', returnDate: '' })
const multiFlightLegs = ref([{ origin: '', destination: '', departureDate: '', returnDate: '' }])

const carSearchState = reactive({ origin: '', destination: '', pickUpDate: '' })
const differentCarDropoff = ref(false)

const transferMode = ref('pickup')
const transferSearchState = reactive({ origin: '', destination: '', date: '', time: '10:00' })
const transferOccupancy = reactive({ adults: 1, children: 0 })

const activitiesSearchState = reactive({ destination: '', date: '' })

const packageOccupancy = reactive({ rooms: 1, adults: 2, children: 0 })
const packageSearchState = reactive({ 
  origin: '', destination: '', departureDate: '', returnDate: '', hotelCheckIn: '', hotelCheckOut: ''
})

const cruiseMonths = [
  { value: 'ANY', label: 'Any Month' },
  { value: '05/1/2026', label: 'May 2026' },
  { value: '06/1/2026', label: 'June 2026' },
  { value: '07/1/2026', label: 'July 2026' },
  { value: '08/1/2026', label: 'August 2026' },
  { value: '09/1/2026', label: 'September 2026' },
  { value: '10/1/2026', label: 'October 2026' },
  { value: '11/1/2026', label: 'November 2026' },
  { value: '12/1/2026', label: 'December 2026' },
]

const cruiseDestinations = [
  { value: 'ANY', label: 'Any Destination' },
  { value: 'C', label: 'Caribbean' },
  { value: 'M', label: 'Mexico' },
  { value: 'A', label: 'Alaska' },
  { value: 'EU', label: 'Europe & Mediterranean' },
  { value: 'HAW', label: 'Hawaii' },
  { value: 'BAH', label: 'Bahamas' },
  { value: 'BER', label: 'Bermuda' },
  { value: 'PAC', label: 'South Pacific' },
]

const cruiseLengths = [
  { value: 'ALL', label: 'Any Length' },
  { value: '1', label: '1-2 Nights' },
  { value: '2', label: '3-5 Nights' },
  { value: '3', label: '6-9 Nights' },
  { value: '4', label: '10-14 Nights' },
  { value: '5', label: '15+ Nights' },
]

const cruiseLines = [
  { value: 'ALL', label: 'Any Cruise Line' },
  { value: '44', label: 'Royal Caribbean' },
  { value: '1', label: 'Carnival' },
  { value: 'NCL', label: 'Norwegian Cruise Line' },
  { value: 'MSC', label: 'MSC Cruises' },
  { value: 'CEL', label: 'Celebrity Cruises' },
  { value: 'VIR', label: 'Virgin Voyages' },
  { value: 'DIS', label: 'Disney Cruise Line' },
  { value: 'PRI', label: 'Princess Cruises' },
]

const cruiseSearchState = reactive({ 
  destination: '', 
  destinationLabel: '',
  departingMonth: '03/1/2026',
  departingLabel: 'March 2026',
  length: '',
  lengthLabel: '',
  line: '',
  lineLabel: ''
})

import { useFlights } from '~/composables/modules/flights/useFlights'
import LocationPicker from './LocationPicker.vue'
import FlightDateRangePicker from './FlightDateRangePicker.vue'
import Occupancypicker from './Occupancypicker.vue'
import CityPicker from './CityPicker.vue'

const { searchFlights } = useFlights()

const handleSearch = () => {
  isFocused.value = false
  const query: any = { tab: currentTab.value }
  
  if (currentTab.value === 'Flights') {
    const leg = flightSearchState
    if (!leg.origin || !leg.destination || !leg.departureDate) return

    searchFlights({
      origin: leg.origin,
      destination: leg.destination,
      departureDate: leg.departureDate,
      returnDate: flightMode.value === 'roundtrip' ? leg.returnDate : undefined,
      adults: flightTravelers.adults,
      children: flightTravelers.children,
      infants: 0,
    })
  }

  // Determine path based on category - B2B portal usually keeps them under /dashboard
  // but if the user app uses root paths like /stays, we can use /dashboard/stays
  const categoryMap: any = {
    'Flights': 'flights',
    'Hotels': 'stays',
    'Cars': 'cars',
    'Cruises': 'cruises',
    'Packages': 'packages',
    'Transfers': 'transfers',
    'Activities': 'things-to-do'
  }
  
  const path = `/dashboard/${categoryMap[currentTab.value] || ''}`
  navigateTo({ path, query })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
