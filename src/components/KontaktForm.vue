<template>
  <div class="container">
    <div class="name-input">
      <input type="text" placeholder="first name" />
      <input type="text" placeholder="last name" />
    </div>
    <div class="mail-input">
      <input type="text" name="email" id="mail-input-id" placeholder="e-mail" />
    </div>
    <div class="message-input">
      <textarea
        name="message"
        id="message-input-id"
        placeholder="message"
      ></textarea>
    </div>
    <button>send</button>
  </div>

</template>

<script setup lang="ts"></script>

<style>
.container {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: 10px;
}

.name-input {
  display: flex;
  gap: 10px;

}


#mail-input-id {
  display: flex;
  width: 100%;
}

#message-input-id{
  display: flex;
  width: 100%;

}


</style>
=======
<style></style>
>>>>>>> refs/remotes/origin/main
