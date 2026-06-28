<template>
  <div class="ap-root">
    <!-- Orbital Hero -->
    <section class="ap-hero">
      <div class="ap-orb ap-orb--1"></div>
      <div class="ap-orb ap-orb--2"></div>
      
      <div class="ap-wrap">
        <div class="ap-hero-cnt">
          <div class="ap-badge">Pricing Architecture</div>
          <h1 class="ap-h">Empowering travel agents with <span class="ap-grad">elite infrastructure.</span></h1>
          <p class="ap-p">Scale your agency with direct inventory access and automated workflows. Choose the foundation that fits your growth.</p>
        </div>
      </div>
    </section>

    <!-- Pricing Grid -->
    <section class="ap-main">
      <div class="ap-wrap">
        <div class="ap-grid">
          
          <!-- Startup -->
          <div class="ap-card animate-in" style="animation-delay: 0.1s">
            <div class="ap-card-hd">
              <span class="ap-card-tag">Foundation</span>
              <h3 class="ap-card-h">Startup</h3>
              <div class="ap-card-price">
                <span class="ap-card-cur">$</span>
                <span class="ap-card-val">0</span>
                <span class="ap-card-sub">/mo</span>
              </div>
              <p class="ap-card-desc">Perfect for independent advisors starting their journey.</p>
            </div>
            <div class="ap-card-body">
              <ul class="ap-feats">
                <li v-for="f in startupFeatures" :key="f" class="ap-feat">
                  <Check class="ap-feat-ico" />
                  <span>{{ f }}</span>
                </li>
              </ul>
            </div>
            <div class="ap-card-ft">
              <NuxtLink to="/auth/register" class="ap-btn ap-btn--outline">Free Onboarding</NuxtLink>
            </div>
          </div>

          <!-- Professional -->
          <div class="ap-card ap-card--high animate-in" style="animation-delay: 0.2s">
            <div class="ap-card-pop">Recommended for scale</div>
            <div class="ap-card-hd">
              <span class="ap-card-tag ap-card-tag--blue">Growth</span>
              <h3 class="ap-card-h">Professional</h3>
              <div class="ap-card-price">
                <span class="ap-card-cur">$</span>
                <span class="ap-card-val">49</span>
                <span class="ap-card-sub">/mo</span>
              </div>
              <p class="ap-card-desc">Advanced tools for established teams and sub-agents.</p>
            </div>
            <div class="ap-card-body">
              <ul class="ap-feats">
                <li v-for="f in proFeatures" :key="f" class="ap-feat">
                  <Check class="ap-feat-ico ap-feat-ico--blue" />
                  <span>{{ f }}</span>
                </li>
              </ul>
            </div>
            <div class="ap-card-ft">
              <NuxtLink to="/auth/register" class="ap-btn ap-btn--primary">Scale Now</NuxtLink>
            </div>
          </div>

          <!-- Enterprise -->
          <div class="ap-card ap-card--dark animate-in" style="animation-delay: 0.3s">
            <div class="ap-card-hd">
              <span class="ap-card-tag ap-card-tag--white">Consolidator</span>
              <h3 class="ap-card-h">Enterprise</h3>
              <div class="ap-card-price">
                <span class="ap-card-val">Custom</span>
              </div>
              <p class="ap-card-desc">White-label solutions for large-scale operations.</p>
            </div>
            <div class="ap-card-body">
              <ul class="ap-feats">
                <li v-for="f in enterpriseFeatures" :key="f" class="ap-feat">
                  <Check class="ap-feat-ico ap-feat-ico--primary" />
                  <span>{{ f }}</span>
                </li>
              </ul>
            </div>
            <div class="ap-card-ft">
              <NuxtLink to="/contact" class="ap-btn ap-btn--white">Contact Architects</NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Trust Footer -->
    <section class="ap-trust">
      <div class="ap-wrap">
        <div class="ap-trust-inner">
           <p>All plans include access to 400+ airlines and 600,000+ properties worldwide.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Check } from 'lucide-vue-next'
import { useTracking } from '@/composables/core/useTracking'

const { trackAction } = useTracking()

onMounted(() => trackAction('navigated_to_pricing'))

const startupFeatures = [
  'Direct access to best prices',
  'Global inventory access',
  'Unlimited client records',
  'Standard dashboard',
  'Email support'
]

const proFeatures = [
  'Faster ticketing priority',
  'Branded client receipts',
  'Commission automation',
  'Priority WhatsApp support',
  'Up to 5 Sub-agents'
]

const enterpriseFeatures = [
  'Unlimited sub-agents',
  'White-label portal',
  'Automated payouts',
  'Dedicated manager',
  'API integration access'
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

.ap-root {
  min-height: 100vh;
  background: #09090b;
  color: #fff;
  font-family: 'Sora', sans-serif;
  overflow-x: hidden;
}

.ap-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Hero ─────────────────────────────────────────────────────────── */
.ap-hero {
  position: relative;
  padding: 80px 0 100px;
  text-align: center;
}

.ap-orb {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}
.ap-orb--1 { top: -200px; right: -100px; background: rgba(0, 102, 255, 0.15); }
.ap-orb--2 { bottom: -100px; left: -100px; background: rgba(0, 255, 204, 0.05); }

.ap-hero-cnt { position: relative; z-index: 10; max-width: 800px; margin: 0 auto; }

.ap-badge {
  display: inline-block; font-size: 10px; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.2em; color: #0066ff; background: rgba(0, 102, 255, 0.1);
  padding: 6px 16px; border-radius: 100px; margin-bottom: 24px; border: 1px solid rgba(0, 102, 255, 0.2);
}

.ap-h { font-size: 40px; font-weight: 800; line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.04em; }
.ap-grad { background: linear-gradient(to right, #0066ff, #00ffcc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.ap-p { font-size: 18px; color: #a1a1aa; line-height: 1.6; max-width: 600px; margin: 0 auto; }

/* ── Pricing ──────────────────────────────────────────────────────── */
.ap-main { margin-top: -80px; position: relative; z-index: 20; padding-bottom: 100px; }
.ap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; align-items: stretch; }

.ap-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.ap-card:hover { transform: translateY(-8px); border-color: rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.05); }

.ap-card--high {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #0066ff;
  position: relative;
  transform: scale(1.05);
  box-shadow: 0 20px 60px rgba(0, 102, 255, 0.15);
}
.ap-card--high:hover { transform: scale(1.05) translateY(-8px); }

.ap-card--dark {
  background: linear-gradient(145deg, #111, #000);
  border-color: #222;
}

.ap-card-pop {
  position: absolute; top: -16px; left: 50%; transform: translateX(-50%);
  background: #0066ff; color: #fff; font-size: 10px; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 16px; border-radius: 100px;
}

.ap-card-hd { margin-bottom: 32px; flex-grow: 0; }
.ap-card-tag { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #71717a; margin-bottom: 12px; display: block; }
.ap-card-tag--blue { color: #0066ff; }
.ap-card-tag--white { color: #fff; }

.ap-card-h { font-size: 20px; font-weight: 800; margin-bottom: 12px; letter-spacing: -0.02em; }
.ap-card-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 16px; }
.ap-card-cur { font-size: 20px; font-weight: 700; color: #71717a; }
.ap-card-val { font-size: 36px; font-weight: 800; letter-spacing: -0.03em; }
.ap-card-sub { font-size: 14px; font-weight: 600; color: #71717a; }
.ap-card-desc { font-size: 14px; color: #71717a; line-height: 1.5; }

.ap-card-body { flex-grow: 1; margin-bottom: 40px; }
.ap-feats { display: flex; flex-direction: column; gap: 16px; }
.ap-feat { display: flex; items-start: center; gap: 12px; font-size: 14px; font-weight: 500; color: #d1d1db; }
.ap-feat-ico { width: 16px; height: 16px; flex-shrink: 0; color: #71717a; margin-top: 2px; }
.ap-feat-ico--blue { color: #0066ff; }
.ap-feat-ico--primary { color: #00ffcc; }

.ap-card-ft { mt: auto; }
.ap-btn {
  display: flex; align-items: center; justify-content: center; height: 44px; border-radius: 12px;
  font-size: 14px; font-weight: 700; text-decoration: none; transition: all 0.3s;
}
.ap-btn--primary { background: #0066ff; color: #fff; }
.ap-btn--primary:hover { background: #0052cc; box-shadow: 0 8px 24px rgba(0, 102, 255, 0.3); }
.ap-btn--outline { border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; }
.ap-btn--outline:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2); }
.ap-btn--white { background: #fff; color: #000; }
.ap-btn--white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2); }

/* ── Trust ────────────────────────────────────────────────────────── */
.ap-trust { padding-bottom: 120px; text-align: center; }
.ap-trust-inner { padding: 40px; background: rgba(255, 255, 255, 0.02); border-radius: 40px; border: 1px solid rgba(255, 255, 255, 0.05); }
.ap-trust-inner p { font-size: 14px; color: #71717a; font-weight: 500; }

/* ── Anim ─────────────────────────────────────────────────────────── */
.animate-in { animation: apIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes apIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) {
  .ap-grid { grid-template-columns: 1fr; gap: 24px; padding: 0 20px; }
  .ap-card--high { transform: none; }
  .ap-card--high:hover { transform: translateY(-8px); }
  .ap-h { font-size: 28px; }
}
</style>
