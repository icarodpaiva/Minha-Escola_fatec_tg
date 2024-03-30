import { useNavigation as useReactNativeNavigation } from "@react-navigation/native"

import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../navigation"

type Stacks = NativeStackNavigationProp<RootStackParamList>

export const useNavigation = () => {
  return useReactNativeNavigation<Stacks>()
}
