import React, { useEffect } from "react";
import { List, Space, Tag, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useMachine } from "@xstate/react";

import {
  fetchActress,
  selectAllActresses,
  selectActressError,
  Item,
} from "@/reducers/actress";
import stateMachine from "@/utils/machine";

export default function Actress() {
  const dispatch = useDispatch();
  const actressList: Item[] = useSelector(selectAllActresses);
  const actressError: any = useSelector(selectActressError);
  const [state, triggerTransition] = useMachine(stateMachine);

  useEffect(() => {
    dispatch(fetchActress()).then(() => {
      triggerTransition("RESOLVE")
    }).catch(() => {
      triggerTransition("REJRCT")
    });
  }, []);
  return (
    <div>
      {state.matches("pending") && <Spin />}
      {state.matches("rejected") && <>{actressError.message}</>}
      {state.matches("resolved") && (
        <List
          dataSource={actressList}
          renderItem={(item: Item) => (
            <List.Item key={item.uuid}>
              <Space>
                <Tag>{item.name}</Tag>
                <Tag>{item.birthday}</Tag>
                <Tag>{item.location}</Tag>
              </Space>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
