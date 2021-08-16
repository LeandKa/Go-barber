import React, {useEffect, useRef, useCallback, useState} from 'react';
import {InputContainer, TextErro, TextInput} from './style';
import {useField} from '@unform/core';

export default function Input({
  name,
  text,
  onChangeText,
  children,
  secure,
  ...rest
}) {
  const inputRef = useRef(null);

  const [color, setColor] = useState('2px solid #ff9000');
  const {fieldName, registerField, defaultValue, error} = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (error) {
      setColor('2px solid red');
    } else {
      setColor('2px solid #ff9000');
    }
  }, [error]);

  const {clearError} = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: value});
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: ''});
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    text => {
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText]
  );

  return (
    <>
      {error && <TextErro>{error}</TextErro>}
      <InputContainer error={color}>
        {children}
        <TextInput
          secureTextEntry={secure}
          placeholder={text}
          ref={inputRef}
          onFocus={clearError}
          placeholderTextColor="white"
          onChangeText={handleChangeText}
          defaultValue={defaultValue}
          {...rest}
        />
      </InputContainer>
    </>
  );
}
