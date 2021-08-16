import React, {useContext, useEffect} from 'react';
import {Image, Input, IconContainer, View} from './style';
import {Context} from '~/store/Context';

export default function FileInput({defaultValue}) {
  const {previewAvatar, setAvatar, hasPreview, changeImage} = useContext(
    Context
  );

  useEffect(() => {
    setAvatar(defaultValue);
  }, []);

  return (
    <View>
      {hasPreview ? (
        <Image source={{uri: previewAvatar.uri}} />
      ) : (
        <Image
          source={{
            uri: `http://192.168.0.10:3000/images/avatar/${defaultValue.url}`,
          }}
        />
      )}

      <IconContainer onPress={changeImage}>
        <Input name="camera" />
      </IconContainer>
    </View>
  );
}
