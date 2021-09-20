import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle, FiEye } from 'react-icons/fi'

import { Container, TextAreaContainer, Error, PassIcon } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  name: string
  type: string
  placeholder: string
  label: string
  icon?: React.ComponentType<IconBaseProps>
}

export const TextArea:React.FC<InputProps> = ({name, icon:Icon, label,...props}) => {
  const [ isFocused, setIsFocused ] = useState(false)
  const [ isFilled, setIsFilled ] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(()=>{
    setIsFocused(true)
  },[])

  const handleInputBlur = useCallback(()=>{
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
  },[])

  useEffect(()=>{
    registerField({
      name:fieldName,
      ref:inputRef.current,
      path:'value'
    })
  },[fieldName, registerField])

  return (
    <Container>
      <label>
        {label}
      </label>
      <TextAreaContainer isErrored={!! error} isFilled={isFilled} isFocused={isFocused} >
        {Icon && <Icon size={20}/>}
        <textarea
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          rows={6}
          {...props}
        />
        {props.type === 'password' && (
          <PassIcon>
            <FiEye size={20} />
          </PassIcon>
        )}
        {error  &&
          <Error title={error} >
            <FiAlertCircle color="c53030" size={20} />
          </Error>
        }
      </TextAreaContainer>
    </Container>
  );
};

