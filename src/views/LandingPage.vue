<template>
  <div class="landing-page page-wrap">
    <Navbar />
    <Banner />
    <Solutions />
    <ScrollReveal animation="fade-up">
      <DataResults />
    </ScrollReveal>
    <BigBgZone>
      <ScrollReveal animation="fade-up">
        <ChooseUs />
      </ScrollReveal>
      <SelfDevelopedSystems />
    </BigBgZone>
    <ScrollReveal animation="fade-up">
      <OverseasCases />
    </ScrollReveal>
    <ScrollReveal animation="fade-up">
      <ContentTraining />
    </ScrollReveal>
    <ScrollReveal animation="fade-up">
      <OverseasLeads />
    </ScrollReveal>
    <ScrollReveal animation="fade-up">
      <SiteFooter />
    </ScrollReveal>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Banner from '../components/Banner.vue'
import Solutions from '../components/Solutions.vue'
import DataResults from '../components/DataResults.vue'
import BigBgZone from '../components/BigBgZone.vue'
import ChooseUs from '../components/ChooseUs.vue'
import SelfDevelopedSystems from '../components/SelfDevelopedSystems.vue'
import OverseasCases from '../components/OverseasCases.vue'
import ContentTraining from '../components/ContentTraining.vue'
import OverseasLeads from '../components/OverseasLeads.vue'
import SiteFooter from '../components/SiteFooter.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
</script>
