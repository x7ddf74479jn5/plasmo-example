import { ActionIcon, Image, Tooltip, createEmotionCache } from "@mantine/core"
import IconUrl from "data-base64:~assets/icon.png"
import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

const styleElement = document.createElement("style")

const styleCache = createEmotionCache({
  key: "plasmo-mantine-cache",
  prepend: true,
  container: styleElement
})

styleCache.sheet.insert(cssText)

export const getStyle = () => styleElement

type HideRequest = {
  name: "hide"
}

type TranslateRequest = {
  name: "translate"
  body: {
    selectedText: string
  }
}

const Icon = () => {
  const [show, setShow] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [orect, setOrect] = useState<DOMRect>()

  useEffect(() => {
    const mouseupHandler = () => {
      const selection = window.getSelection()
      if (!selection || selection.toString().length === 0) return
      const oRange = selection.getRangeAt(0)
      const oRect = oRange.getBoundingClientRect()
      setOrect(oRect)
      setSelectedText(selection.toString())
      setShow(true)
    }
    document.addEventListener("mouseup", mouseupHandler)

    return document.removeEventListener("mouseup", mouseupHandler)
  }, [])

  const handleClick = async () => {
    await sendToContentScript({
      name: "hide"
    } satisfies HideRequest)
    await sendToBackground({
      name: "translate",
      body: {
        selectedText
      }
    } satisfies TranslateRequest)
  }

  if (!show) return null

  return (
    <div className="absolute w-full left-0 top-0 z-50">
      <div
        style={{
          position: "absolute",
          left: window.scrollX + orect.right,
          top: window.scrollY + orect.bottom,
          zIndex: 2147483550
        }}>
        <Tooltip label="選択したテキストを翻訳" withArrow>
          <ActionIcon
            radius="xl"
            variant="default"
            size="lg"
            className="shadow-sm z-50"
            onClick={handleClick}>
            <div className="w-5 h-5 z-50">
              <Image src={IconUrl} />
            </div>
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  )
}

export default Icon
