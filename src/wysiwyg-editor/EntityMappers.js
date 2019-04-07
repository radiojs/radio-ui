import React from 'react';
import { CompositeDecorator } from 'draft-js';

const LinkDecorator = {
  component: ({ contentState, entityKey, children }) => {
    const { url, target } = contentState.getEntity(entityKey).getData();
    return !target || target === '_self' ? (
      <a href={url}>{children}</a>
    ) : (
      <a href={url} target={target}>{children}</a>
    );
  },
  strategy: (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK');
    }, callback);
  },
};

const ImageDecorator = {
  component: ({ contentState, entityKey }) => {
    const { url, className } = contentState.getEntity(entityKey).getData();
    return (<img className={className} src={url} />);
  },
  strategy: (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE');
    }, callback);
  },
};

const decorator = new CompositeDecorator([
  LinkDecorator,
  ImageDecorator,
]);

export default decorator;
