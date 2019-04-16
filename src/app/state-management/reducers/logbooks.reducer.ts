import { initialLogbookState, LogbookState } from "../state/logbooks.store";
import {
  ActionTypes,
  FetchLogbooksCompleteAction,
  LogbooksAction,
  FetchLogbookCompleteAction
} from "../actions/logbooks.actions";

export function logbooksReducer(
  state: LogbookState = initialLogbookState,
  action: LogbooksAction
): LogbookState {
  console.log("Action came in! " + action.type);
  switch (action.type) {
    case ActionTypes.FETCH_LOGBOOKS_COMPLETE: {
      let logbooks = (action as FetchLogbooksCompleteAction).logbooks;
      logbooks.forEach(logbook => {
        let descendingMessages = logbook.messages.reverse();
        logbook.messages = descendingMessages;
      });
      return { ...state, logbooks };
    }
    case ActionTypes.FETCH_LOGBOOK_COMPLETE: {
      let logbook = (action as FetchLogbookCompleteAction).logbook;
      logbook.messages.forEach(message => {
        if (message.content.msgtype === "m.image") {
          let externalThumbnailUrl = message.content.info.thumbnail_url.replace(
            "mxc://",
            "https://scicat03.esss.lu.se:8448/_matrix/media/r0/download/"
          );
          message.content.info.thumbnail_url = externalThumbnailUrl;
          let externalFullsizeUrl = message.content.url.replace(
            "mxc://",
            "https://scicat03.esss.lu.se:8448/_matrix/media/r0/download/"
          );
          message.content.url = externalFullsizeUrl;
        }
      });
      return { ...state, logbook };
    }
    default: {
      return state;
    }
  }
}
