import { createEmotionCache } from "@mantine/core"
import {
  ActionIcon,
  Avatar,
  Box,
  CopyButton,
  Divider,
  Flex,
  Group,
  Select,
  Stack,
  Text,
  Tooltip
} from "@mantine/core"
import { useClickOutside } from "@mantine/hooks"
import IconUrl from "data-base64:~assets/icon.png"
import cssText from "data-text:~style.css"
import { useState } from "react"
import { MdDone, MdOutlineContentCopy, MdVolumeUp } from "react-icons/md"

import { useMessage } from "@plasmohq/messaging/hook"

import type { ShowRequest } from "~background"
import { ThemeProvider } from "~theme"

type ContentProps = {
  translatedText: string
  originalText: string
  targetLang: string
}
export const Content = ({
  translatedText,
  originalText,
  targetLang
}: ContentProps) => {
  const [opened, setOpened] = useState(true)
  const [dialog, setDialog] = useState<HTMLDivElement>(null)

  useClickOutside(() => setOpened(false), null, [dialog])

  return opened ? (
    <Box
      sx={(theme) => ({
        backgroundColor: "white",
        textAlign: "left",
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        maxWidth: 400,
        boxShadow: "0 0 10px rgba(0,0,0,0.3);",
        zIndex: 2147483550
      })}
      component="div"
      ref={setDialog}>
      <Flex pb="xs" gap="xs" justify="flex-start" align="center">
        <Avatar src={IconUrl} />
        <Text size="md">訳文：</Text>
        <Select
          value={targetLang}
          size="xs"
          data={[
            { value: "EN", label: "英語" },
            { value: "KO", label: "韓国語" },
            { value: "ZH", label: "中国語" },
            { value: "JA", label: "日本語" }
          ]}
        />
      </Flex>
      <Divider />
      <Stack pt="sm" spacing="xs" className="text-left">
        <Text size="sm">{translatedText}</Text>
        <Group position="right" spacing="xs">
          <Tooltip label="音声読み上げ" withArrow>
            <ActionIcon>
              <MdVolumeUp />
            </ActionIcon>
          </Tooltip>
          <CopyButton value={translatedText}>
            {({ copied, copy }) => (
              <Tooltip
                label={
                  copied ? "訳文をコピーしました" : "クリップボードにコピー"
                }
                withArrow>
                <ActionIcon onClick={copy}>
                  {copied ? <MdDone /> : <MdOutlineContentCopy />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </Stack>
    </Box>
  ) : (
    <></>
  )
}

const styleElement = document.createElement("style")

const styleCache = createEmotionCache({
  key: "plasmo-mantine-cache",
  prepend: true,
  container: styleElement
})

styleCache.sheet.insert(cssText)

export const getStyle = () => styleElement

type Props = {
  translatedText: string
  originalText: string
  targetLang: string
}

const Main = ({ translatedText, originalText, targetLang }: Props) => {
  return (
    <ThemeProvider emotionCache={styleCache}>
      <div className="absolute w-full left-0 top-0 z-50">
        <div className="absolute left-4 top-4 z-50">
          <Content
            translatedText={translatedText}
            originalText={originalText}
            targetLang={targetLang}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}

const Container = () => {
  const { data } = useMessage<ShowRequest, undefined>(async (_req, _res) => {})
  const { lang, translatedText, originalText } = data.body

  if (!data || data.name !== "show") return

  return (
    <Main
      targetLang={lang}
      translatedText={translatedText}
      originalText={originalText}
    />
  )
}

export default Container
