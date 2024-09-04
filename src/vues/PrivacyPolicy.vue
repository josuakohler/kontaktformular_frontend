<template>
  <v-btn @click="goback()" class="goBackBtn">back</v-btn>
  <home-comp></home-comp>
  <div
    style="
      max-width: 800px;
      margin: auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    "
  >
    <h1>Privacy Policy</h1>

    <p>
      Your privacy is important to us. This Privacy Policy explains how
      ContactForm collects, uses, and discloses your personal information when
      you use our web application ("App") and its associated services, including
      our contact form.
    </p>

    <p>
      We collect certain personal information when you fill out the contact form
      on our App. This includes your name, email address, and the content of the
      message you provide. Additionally, we may automatically collect
      information about your device and usage patterns, such as your IP address,
      browser type and version, operating system, and the pages you visit along
      with the time spent on each page.
    </p>

    <p>
      The information we collect is used primarily to respond to your inquiries,
      using your name, email address, and message content to address your
      questions, comments, or concerns. We may also use automatically collected
      information to analyze trends, administer the site, and gather demographic
      information to improve our App.
    </p>

    <p>
      We do not sell, trade, or transfer your personal information to outside
      parties, except in specific circumstances. We may share your information
      with third-party service providers who assist us in operating our App,
      conducting our business, or providing services to you, provided they agree
      to keep this information confidential. Additionally, we may disclose your
      information if required to do so by law or in response to valid requests
      by public authorities.
    </p>

    <p>
      To protect the security of your personal information, we implement
      appropriate technical and organizational measures. However, please be
      aware that no method of transmission over the Internet or method of
      electronic storage is completely secure, and we cannot guarantee absolute
      security.
    </p>

    <p>
      Depending on your location, you may have certain rights regarding your
      personal information. These rights may include the right to request a copy
      of the personal information we hold about you, the right to request that
      we correct any inaccuracies, and the right to request the deletion of your
      personal information. To exercise any of these rights, please contact us
      using the contact information provided below.
    </p>

    <p>
      Our App may use cookies and similar tracking technologies to enhance your
      experience. You can control the use of cookies at the individual browser
      level.
    </p>

    <p>
      Our App may contain links to other websites. Please note that we are not
      responsible for the privacy practices or the content of these third-party
      sites.
    </p>

    <p>
      We may update this Privacy Policy from time to time. Any changes will be
      posted on this page with an updated revision date.
    </p>

    <p>
      If you have any questions about this Privacy Policy, please contact us at:
    </p>

    <address style="margin-top: 20px; font-style: normal">
      <strong>Josua Kohler</strong><br />
      Alvierstrasse 37<br />
      7324 Vilters<br />
      Email:
      <a href="mailto:josua.kohler05@gmail.com" style="color: #2980b9"
        >josua.kohler05@gmail.com</a
      ><br />
      Phone:
      <a href="tel:+41762451101" style="color: #2980b9">+41 76 245 11 01</a>
    </address>
  </div>
</template>

<script setup lang="ts">
import router from '../router';


const goback = () => {
    router.push("./")
}

</script>

<style>
.goBackBtn{

margin: 20px;


}




</style>