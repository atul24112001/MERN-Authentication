import { useToast } from "@chakra-ui/react";

export const TosterUI = (props) => {
    const Toast = useToast();

    return Toast({
        title: props.title,
        description: props.description,
        status: props.status,
        duration: 3000,
        isClosable: true,
        position: "top-left"
    })
}