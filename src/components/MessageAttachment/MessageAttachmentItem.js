/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import TextMessagePreview from '../SidebarRecentItem/MessagePreview/TextMessagePreview';
import Icon from '../Icon/Icon';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import MessageContent from '../MessageContent/MessageContent';
import decorators from './utils/decorators';
import styles from './MessageAttachment.css';

type Props = {
  className?: string,
  type: 'forward' | 'reply',
  message: Message,
  short: boolean,
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (message: Message) => mixed,
  maxHeight: number,
  maxWidth: number
};

class MessageAttachmentItem extends Component<Props> {
  handleGoToPeer = (event: SyntheticEvent<>): void => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.message.sender) {
      this.props.onGoToPeer(this.props.message.sender.peer);
    }
  };

  handleGoToMessage = (event: SyntheticMouseEvent<>): void => {
    if (event.target.tagName === 'A') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.props.onGoToMessage(this.props.message);
  };

  renderHeader() {
    const { message: { sender }, short, type } = this.props;

    if (short || !sender) {
      return null;
    }

    return (
      <header className={styles.header}>
        <Icon glyph={type} size={20} className={styles.icon} />
        <PeerInfoTitle
          title={sender.title}
          userName={sender.userName}
          titleClassName={styles.name}
          userNameClassName={styles.nick}
          onTitleClick={this.handleGoToPeer}
          onUserNameClick={this.handleGoToPeer}
          addSpacebars
        />
        {type === 'reply' ? this.renderTimestamp() : null}
      </header>
    );
  }

  renderTimestamp() {
    const { message } = this.props;

    return (
      <time className={styles.time} dateTime={message.fullDate.toISOString()}>
        {message.date}
      </time>
    );
  }

  renderContent() {
    const { message: { content, rid }, type, maxWidth, maxHeight } = this.props;
    const messageClassName = classNames(styles.message, {
      [styles.replyContent]: type === 'reply',
      [styles.replyDocument]: content.type === 'document'
    });

    switch (type) {
      case 'reply':
        if (content.type === 'text') {
          return (
            <TextMessagePreview className={messageClassName} content={content} emojiSize={16} decorators={decorators} />
          );
        }

        return (
          <MessageContent
            className={messageClassName} content={content} rid={rid} maxWidth={maxWidth}
            maxHeight={70}
          />
        );

      case 'forward':
        return (
          <MessageContent
            className={messageClassName}
            content={content}
            rid={rid}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const { short, type } = this.props;

    const className = classNames(
      styles.itemContainer,
      styles[type],
      {
        [styles.short]: short
      },
      this.props.className
    );

    return (
      <div className={className} onClick={this.handleGoToMessage}>
        {this.renderHeader()}
        <div className={styles.content}>
          <div className={styles.messageWrapper}>{this.renderContent()}</div>
          {type === 'forward' ? <div className={styles.timeWrapper}>{this.renderTimestamp()}</div> : null}
        </div>
      </div>
    );
  }
}

export default MessageAttachmentItem;
