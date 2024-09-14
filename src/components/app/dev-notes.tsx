/* eslint-disable react/no-unescaped-entities */
export const DeveloperNotes = () => (
  <div className="space-y-4 text-xs text-muted-foreground">
    <p><strong>Hello!</strong> This is a small note from the author of this app.</p>
    <p>I've made this app in a day, so please forgive the bugs. The goal was for me to be able to quickly add ISBN by barcode into a database which I could share with my family. Most apps around don't have such simple scope, they tend to have much bigger goals but they miss this exact spot.</p>
    <p>If you read this, you've already been redirected to notion and you granted permission to a page, probably just to see what this is all about. Now that you're here, the app will list existing database <strong>which emoji matches this one: 📚</strong>. This is a neat shortcut, but also the only thing you shouldn't mess with: <strong>do not change that emoji!</strong></p>
    <p>After that, the app is merely a read/write of the notion's database. The real feature which makes it useful is the "create entry" which is in batch mode when using the barcode scanner.</p>
    <p>I plan to add features, maybe, if I keep using this long enough to make it worth it. Notably, I'm collecting books in a few languages (french, english, thai, etc...) and having access to complete ISBN databases is a challenge, especially for cheap/free. Therefore I'm thinking that, when I'll be bored to typing titles by hand, why not ask an AI to crawl the web and find a title for a given ISBN.</p>
    <p>If you want to contact me, or read the code, or fix a bug, the source code of this app can be found on <a className="text-accent-foreground" href="https://github.com/y-nk/notion-isbn-db">github</a>.</p>
  </div>
)
