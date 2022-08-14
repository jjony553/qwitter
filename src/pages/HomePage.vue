<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-sm">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newQweetContent"
            counter
            maxlength="280"
            placeholder="What`s happneing?"
            autogrow
            class="new-qweet"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>

            <template v-slot:after> </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            :disable="!newQweetContent"
            unelevated
            rounded
            class="q-mb-lg"
            color="primary"
            label="Qweet"
            no-caps
          />
        </div>
      </div>

      <q-separator size="10px" color="grey-2" class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slower"
          leave-active-class="animated fadeOut slower"
        >
          <q-item
            class="qweet q-py-md"
            v-for="qweet in qweets"
            :key="qweet.date"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong class="q-mr-xs">IU</strong>
                <span class="text-grey-7">
                  IU@naverc.com <br class="lt-md" />&bull;
                  {{ relativeDate(qweet.date) }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1">{{
                qweet.content
              }}</q-item-label>
              <div class="qweet-icon row justify-between q-mt-sm">
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fa-regular fa-comment"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-retweet"
                />
                <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-trash"
                  @click="deleteQweet(qweet)"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>

        <q-separator inset="item" />
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { formatDistance } from "date-fns";

export default defineComponent({
  name: "HomePage",
  setup() {
    let newQweetContent = ref("");
    let qweets = reactive([
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique sed blanditiis ea minima aut eius, nostrum id doloribus quam temporibus eligendi. Eum excepturi perspiciatis enim dolore reiciendis voluptatem quos odio.",
        date: 1660509580421,
      },
      {
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique sed blanditiis ea minima aut eius, nostrum id doloribus quam temporibus eligendi. Eum excepturi perspiciatis enim dolore reiciendis voluptatem quos odio.",
        date: 1660509539230,
      },
    ]);

    function relativeDate(value) {
      return formatDistance(value, new Date());
    }

    function addNewQweet() {
      let newQweet = {
        content: newQweetContent.value,
        date: Date.now(),
      };
      qweets.unshift(newQweet);
      newQweetContent.value = "";
    }

    function deleteQweet(qweet) {
      let dateToDelete = qweet.date;
      let index = qweets.findIndex((qweet) => qweet.date === dateToDelete);
      qweets.splice(index, 1);
    }

    return {
      newQweetContent,
      qweets,
      relativeDate,
      addNewQweet,
      deleteQweet,
    };
  },
});
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.qweet-content
  white-space: pre-line

.qweet-icon
 margin-left: -5px

.qweet:not(:first-child)
 border-top: 1px solid rgbg(0,0,0,0.12)
</style>
