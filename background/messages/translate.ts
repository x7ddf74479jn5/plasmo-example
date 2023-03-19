import type { PlasmoMessaging } from "@plasmohq/messaging"
import { sendToContentScript } from "@plasmohq/messaging"

import { translate } from "~app/translate"

type TranslateRequestBody = {
  selectedText: string
}

type RequestResponse = { message: string }

const handler: PlasmoMessaging.MessageHandler<
  TranslateRequestBody,
  RequestResponse
> = async (req, res) => {
  const { selectedText } = req.body
  const storage = new Storage()
  const lang = await storage.get("target_lang")
  const userTargetLang = lang ?? "EN"
  const translatedText = await translate(selectedText, userTargetLang)

  await sendToContentScript({
    name: "show",
    body: {
      lang: userTargetLang,
      translatedText: translatedText,
      originalText: selectedText
    }
  })

  res.send({ message: "OK" })
}

export default handler
