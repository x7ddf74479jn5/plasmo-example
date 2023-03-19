import { Storage } from "@plasmohq/storage"

import { translate } from "~app/translate"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translation",
    title: "選択したテキストを翻訳",
    contexts: ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!!tab) {
    const storage = new Storage()
    const lang = await storage.get("target_lang")

    switch (info.menuItemId) {
      case "translation": {
        const selectedText =
          info.selectionText !== undefined ? info.selectionText : ""
        const userTargetLang = lang ?? "EN"
        const translatedText = await translate(selectedText, userTargetLang)
        console.log(translatedText)
        break
      }
    }
  }
})

export {}
