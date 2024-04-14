import { useState } from "react"
import { ScrollView, Text } from "react-native"

import { Loading } from "./Loading"
import { DatePicker } from "./DatePicker"
import { Class } from "./Class"

import { useClasses } from "../hooks/useClasses"

const initialDate = new Date().toISOString().replace(/T.*/, "")

export const Classes = () => {
  const [date, setDate] = useState(initialDate)

  const { loadingClasses, classes, refetch } = useClasses(date)

  if (loadingClasses) {
    return <Loading />
  }

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })

  return (
    <ScrollView>
      <DatePicker date={date} setDate={setDate} />

      {!classes?.length ? (
        <Text>Sem aulas para o dia {formattedDate}</Text>
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
