import { useState } from "react"
import { ScrollView, Text } from "react-native"

import { Loading } from "./Loading"
import { DatePicker } from "./DatePicker"
import { Class } from "./Class"

import { useClasses } from "../hooks/useClasses"

export const Classes = () => {
  const [date, setDate] = useState(new Date().toISOString().replace(/T.*/, ""))

  const { loadingClasses, classes, refetch } = useClasses(date)

  if (loadingClasses) {
    return <Loading />
  }

  return (
    <ScrollView>
      <DatePicker date={date} setDate={setDate} />

      {!classes?.length ? (
        <Text>Sem aulas para o dia {date}</Text>
      ) : (
        <>
          {classes.map(groupClass => (
            <Class
              key={groupClass.id}
              groupClass={groupClass}
              refetch={refetch}
            />
          ))}
        </>
      )}
    </ScrollView>
  )
}
