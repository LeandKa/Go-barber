import React, {useCallback, useEffect, useMemo, useState} from 'react';
import api from '~/services/api';
import {launchImageLibrary} from 'react-native-image-picker';

export const Context = React.createContext({
  previewAvatar: {},
  avatar: {},
  hasPreview: false,
});

export function StoreContext({children}) {
  const [previewAvatar, setPreviewAvatar] = useState({});
  const [avatar, setAvatar] = useState({});
  const [hasPreview, setHasPreview] = useState(false);

  const value = useMemo(
    () => ({
      avatar,
      setAvatar,
      setAvatar,
      previewAvatar,
      setPreviewAvatar,
      hasPreview,
      setHasPreview,
    }),
    [
      avatar,
      setAvatar,
      previewAvatar,
      hasPreview,
      setPreviewAvatar,
      setHasPreview,
    ]
  );

  const changeImage = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        const {uri, fileName: name, type, didCancel, errorMessage} = response;
        if (errorMessage) {
          Alert.alert('Error while updating avatar');
        }
        if (didCancel || errorMessage) {
          return;
        }
        setHasPreview(true);
        setPreviewAvatar(response);
      }
    );
  }, []);

  const uploadImage = useCallback(async token => {
    const data = new FormData();
    console.log(previewAvatar);
    data.append('avatar', {
      name: previewAvatar.fileName,
      uri: previewAvatar.uri,
      type: previewAvatar.type,
    });

    try {
      const response = await api.post('/files', data, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Context.Provider
      value={{
        avatar: value.avatar,
        previewAvatar: value.previewAvatar,
        hasPreview: value.hasPreview,
        setAvatar: value.setAvatar,
        setHasPreview: value.setHasPreview,
        changeImage,
        uploadImage,
      }}>
      {children}
    </Context.Provider>
  );
}
