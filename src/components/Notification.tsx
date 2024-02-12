import { useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import useNotificationStore from '../stores/useNotificationStore';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const NotificationList = ({ network }: { network: WalletAdapterNetwork }) => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s,
  );

  const reversedNotifications = [...notifications].reverse();

  return (
    <div className="notifications">
      <div className="notifications_list">
        {reversedNotifications.map((n, idx) => (
          <Notification
            network={network}
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Notification = ({
  network,
  type,
  message,
  description,
  txid,
  onHide,
}) => {
  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000);

    return () => {
      clearInterval(id);
    };
  }, [onHide]);

  return (
    <div className="notification">
      <div className="notifcationContent">
        <div className="icon">
          {type === 'success' ? (
            <CheckCircleIcon
              className="notification__icon"
              style={{ color: 'green' }}
            />
          ) : null}
          {type === 'info' && (
            <InformationCircleIcon
              className="notification__icon"
              style={{ color: 'orange' }}
            />
          )}
          {type === 'error' && (
            <XCircleIcon
              className="notification__icon"
              style={{ color: 'red' }}
            />
          )}
        </div>
        <div className="notification__msg">
          <div style={{ fontWeight: 600 }}>{message}</div>
          {description ? <div>{description}</div> : null}
          {txid ? (
            <div>
              <a
                href={
                  'https://explorer.solana.com/tx/' +
                  txid +
                  `?cluster=${network}`
                }
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 12,
                  cursor: 'pointer',
                }}
              >
                <svg
                  className="notification__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                <div className="flex mx-4">
                  {txid.slice(0, 8)}...
                  {txid.slice(txid.length - 8)}
                </div>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
