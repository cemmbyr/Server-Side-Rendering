import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { BultenContext } from '../context/context';
import bultenData from '../../data/bulten_data.json';
import { bultenHeader } from '../../data/bulten_header';

let uniqButton = 0;
const eventKeys = Object.entries(bultenData.Events);

const Bulten = () => {
  const { applyEventItems, setApplyEventItems } = useContext(BultenContext);

  const [eventUpload, setEventUpload] = useState(eventKeys.slice(0, 300));

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 1000) {
      uniqButton = 0;
      setEventUpload(eventKeys);
    }
  }, []);

  useEffect(() => {
    if (eventKeys.length !== eventUpload.length) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [eventUpload]);

  const handleEventItem = (applyItem) => () => {
    setApplyEventItems((prevState) => {
      if (!prevState.length) {
        return [{ ...applyItem }];
      } else {
        const bultenFindItem = prevState.find(
          (item) => (item.id === applyItem.id && item.bultenKey === applyItem.bultenKey),
        );

        return bultenFindItem
          ? prevState.filter(
            (item) => !(item.id === applyItem.id && item.bultenKey === applyItem.bultenKey),
          )
          : [...prevState, { ...applyItem }];
      }
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="red-text" data-testid="event">
            Event Count:
            {eventKeys.length}
          </th>
          {bultenHeader.map((item, index) => {
            return (
              <th key={index}>{item}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {eventUpload.map(([key, item], eventIndex) => {
          const {
            D,
            DAY,
            LN,
            N,
            T,
            OCG,
          } = item;

          const eventsItem = Object.values(OCG).map(
            (eventItem) => (Object.values(eventItem.OC)),
          ).flat().reduce((pre, curr) => ({ ...pre, [curr.N]: curr.O }), {});

          return (
            <>
              <tr key={eventIndex}>
                <td className="red-text">
                  <span className="green-text">{eventIndex}</span>
                  {DAY + ' ' + D + ' ' + LN}
                </td>

                {bultenHeader.map((bultenItem, index) => {
                  return (
                    <td key={index}>{bultenItem}</td>
                  );
                })}
              </tr>
              <tr key={eventIndex + 1}>
                <td>{key + '  ' + T + '  ' + N}</td>
                <td>Yorumlar</td>
                <td>4</td>

                {bultenHeader.slice(2, bultenHeader.length).map((bultenItem, index) => {
                  const itemStatus = eventsItem[bultenItem];
                  const itemClass = applyEventItems.find(
                    (applyItem) => applyItem.id === key && applyItem.bultenKey === bultenItem,
                  );

                  if (itemStatus) {
                    delete eventsItem[bultenItem];
                    uniqButton += 1;
                  }

                  return itemStatus ? (
                    <td
                      className={`rate-hover ${itemClass && 'yellow-text'}`}
                      key={index}
                      onClick={
                        handleEventItem({
                          id: key,
                          matchName: N,
                          rate: itemStatus,
                          mbs: '4',
                          bultenKey: bultenItem,
                        })
                      }
                      data-testid={`button${uniqButton}`}
                    >
                      {itemStatus}
                    </td>
                  ) : (
                    <td key={index}> </td>
                  );
                })}
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default Bulten;
