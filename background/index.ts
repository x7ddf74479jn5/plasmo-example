import { sendToContentScript } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { translate } from "~app/translate"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translation",
    title: "選択したテキストを翻訳",
    contexts: ["selection"]
  })
})

export type ShowRequest = {
  name: "show"
  tabId: number
  body: {
    lang: string
    translatedText: string
    originalText: string
  }
}

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
        await sendToContentScript({
          name: "show",
          tabId: tab.id,
          body: {
            lang: userTargetLang,
            translatedText: translatedText,
            originalText: selectedText
          }
        })
        break
      }
    }
  }
})

export {}
