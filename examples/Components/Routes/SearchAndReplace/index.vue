<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strike" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <icon name="paragraph" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <icon name="undo" />
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
          <icon name="redo" />
        </button>
      </div>
    </editor-menu-bar>

    <div class="search">
      <input
        ref="search"
        @keydown.enter.prevent="editor.commands.find(searchTerm)"
        placeholder="Search …"
        type="text"
        v-model="searchTerm"
      />
      <input
        @keydown.enter.prevent="editor.commands.replace(replaceWith)"
        placeholder="Replace …"
        type="text"
        v-model="replaceWith"
      />
      <button class="button" @click="editor.commands.find(searchTerm)">
        Find
      </button>
      <button class="button" @click="editor.commands.clearSearch()">
        Clear
      </button>
      <button class="button" @click="editor.commands.replace(replaceWith)">
        Replace
      </button>
      <button class="button" @click="editor.commands.replaceAll(replaceWith)">
        Replace All
      </button>
    </div>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import Icon from 'Components/Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap-v1'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Search,
} from 'tiptap-extensions-v1'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    Icon,
  },
  data() {
    return {
      // searching: false,
      searchTerm: null,
      replaceWith: null,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Search({
            disableRegex: false,
          }),
        ],
        content: `
          <h2>
            Search and Replace
          </h2>
          <p>
            Search something. 🔍 Replace something. ✂️ Or replace all the things! 💥 That's it. That's how a search works. Good luck.
          </p>
        `,
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
@import "~variables";

.search {
  display: flex;
  flex-wrap: wrap;
  background-color: rgba($color-black, 0.1);
  padding: 0.5rem;
  border-radius: 5px;
  margin: 1rem 0;

  input {
    padding: 0.25rem;
    border: 0;
    border-radius: 3px;
    margin-right: 0.2rem;
    font: inherit;
    font-size: 0.8rem;
    width: 20%;
    flex: 1;
  }

  button {

  }
}

.find {
  background: rgba(255, 213, 0, 0.5);
}
</style>
