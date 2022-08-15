<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
                <img
                  src="https://images.khan.co.kr/article/2022/06/28/l_2022062802001611800292791.jpg"
                />
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
          <q-item class="qweet q-py-md" v-for="qweet in qweets" :key="qweet.id">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img
                  src="https://images.khan.co.kr/article/2022/06/28/l_2022062802001611800292791.jpg"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong class="q-mr-xs">IU</strong>
                <span class="text-grey-7">
                  IU@naver.com <br class="lt-md" />&bull;
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
                <q-btn
                  @click="toggleLiked(qweet)"
                  flat
                  round
                  :color="qweet.liked ? 'pink' : 'grey'"
                  size="sm"
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                />

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
import { defineComponent, reactive, ref, onMounted } from "vue";
import { formatDistance } from "date-fns";
import db from "src/boot/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default defineComponent({
  name: "HomePage",
  setup() {
    let newQweetContent = ref("");
    let qweets = reactive([]);
    let qweetChange = reactive([]);
    let index = ref("");

    function relativeDate(value) {
      return formatDistance(value, new Date());
    }

    async function addNewQweet() {
      let newQweet = {
        content: newQweetContent.value,
        date: Date.now(),
        liked: false,
      };
      await addDoc(collection(db, "qweets"), newQweet);
      newQweetContent.value = "";
    }

    async function deleteQweet(qweet) {
      await deleteDoc(doc(db, "qweets", qweet.id));
    }

    async function toggleLiked(qweet) {
      await updateDoc(doc(db, "qweets", qweet.id), {
        liked: !qweet.liked,
      });
    }

    onMounted(() => {
      const q = query(collection(db, "qweets"), orderBy("date"));

      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          qweetChange = change.doc.data();
          qweetChange.id = change.doc.id;
          if (change.type === "added") {
            qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            index = qweets.findIndex((qweet) => qweet.id === qweetChange.id);
            Object.assign(qweets[index], qweetChange);
          }
          if (change.type === "removed") {
            index = qweets.findIndex((qweet) => qweet.id === qweetChange.id);
            qweets.splice(index, 1);
          }
        });
      });
    });

    return {
      newQweetContent,
      qweets,
      relativeDate,
      addNewQweet,
      deleteQweet,
      qweetChange,
      index,
      toggleLiked,
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
  word-break: break-all

.qweet-icon
 margin-left: -5px

.qweet:not(:first-child)
 border-top: 1px solid rgbg(0,0,0,0.12)
</style>
