import { useNavigation as useReactNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { RootStackParamList } from "../navigation"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const useNavigation = () => {
  return useReactNavigation<NavigationProp>()
}
