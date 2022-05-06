import React from 'react'
import { FormControl, FormLabel, Input } from "@chakra-ui/react"

export const StyledInput = (props) => {
    return (
        <FormControl isRequired={props.required}>
            <FormLabel htmlFor={props.title}>{props.title}</FormLabel>
            <Input type={props.type ? props.type : "text"} _focus={{ outline: "2px solid #edf2f7", bgColor: "white" }} value={props.value} onChange={props.onChange} id={props.title} variant="filled" placeholder={props.placeholder} />
        </FormControl>
    )
}