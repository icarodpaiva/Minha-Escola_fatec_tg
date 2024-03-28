import React from "react"
import { View } from "react-native"
import NativeQRCode from "react-native-qrcode-svg"

interface QRCodeProps {
  size: number
  value: string
}

export const QRCode = ({ size, value }: QRCodeProps) => {
  return (
    <View>
      <NativeQRCode value={value} size={size} />
    </View>
  )
}
