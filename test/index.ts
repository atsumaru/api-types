// このテストファイルではRPGアツマールの型定義を利用したコードを記述し、それが正しくビルドできるかのみを確認しています

import AtsumaruTypes from "@atsumaru/api-types";

(async () => {
  let str: string, num: number, bool: boolean;

  if (!window.RPGAtsumaru) {
    return;
  }

  window.RPGAtsumaru.storage.getItems();
  window.RPGAtsumaru.storage.setItems([
    {key: "one key", value: "one value"},
    {key: "another key", value: "another value"}
  ]);
  window.RPGAtsumaru.storage.removeItem("one key");

  window.RPGAtsumaru.popups.openLink("http://some.url");

  window.RPGAtsumaru.comment.changeScene("one scene name");
  window.RPGAtsumaru.comment.resetAndChangeScene("one scene name");
  window.RPGAtsumaru.comment.pushContextFactor("one factor");
  window.RPGAtsumaru.comment.pushMinorContext();
  window.RPGAtsumaru.comment.setContext("one context");
  window.RPGAtsumaru.comment.cameOut.subscribe((commentItems: AtsumaruTypes.CommentItem[]) => {
    commentItems.forEach(item => {
      str = item.comment;
      str = item.command;
    });
  });
  window.RPGAtsumaru.comment.posted.subscribe((item: AtsumaruTypes.CommentItem) => {
    str = item.comment;
    str = item.command;
  });
  window.RPGAtsumaru.comment.verbose = true;

  window.RPGAtsumaru.controllers.defaultController.subscribe(input => {
    str = input.type;
    str = input.key;
  });

  num = window.RPGAtsumaru.volume.getCurrentValue();
  window.RPGAtsumaru.volume.changed().subscribe(volume => {
    num = volume;
  });

  /* experimental */
  if (!window.RPGAtsumaru.experimental) {
    return;
  }

  if (window.RPGAtsumaru.experimental.query) {
    str = window.RPGAtsumaru.experimental.query["some key"];
  }

  if (window.RPGAtsumaru.experimental.storage) {
    if (window.RPGAtsumaru.experimental.storage.getSharedItems) {
      let result = await window.RPGAtsumaru.experimental.storage.getSharedItems([1, 2, 3]);
      str = result[123];
      window.RPGAtsumaru.experimental.storage.getSharedItems([1, 2, 3], 1234);
    }
  }

  if (window.RPGAtsumaru.experimental.popups) {
    if (window.RPGAtsumaru.experimental.popups.openLink) {
      window.RPGAtsumaru.experimental.popups.openLink("http://some.url");
    }

    if (window.RPGAtsumaru.experimental.popups.displayCreatorInformationModal) {
      await window.RPGAtsumaru.experimental.popups.displayCreatorInformationModal();
      await window.RPGAtsumaru.experimental.popups.displayCreatorInformationModal(1234);
    }
  }

  if (window.RPGAtsumaru.experimental.scoreboards) {
    if (window.RPGAtsumaru.experimental.scoreboards.setRecord) {
      await window.RPGAtsumaru.experimental.scoreboards.setRecord(123, 456);
    }

    if (window.RPGAtsumaru.experimental.scoreboards.display) {
      await window.RPGAtsumaru.experimental.scoreboards.display(123);
    }

    if (window.RPGAtsumaru.experimental.scoreboards.getRecords) {
      const result = await window.RPGAtsumaru.experimental.scoreboards.getRecords(123);
      num = result.boardId;
      str = result.boardName;

      if (result.myBestRecord) {
        num = result.myBestRecord.rank;
        num = result.myBestRecord.score;
        str = result.myBestRecord.userName;
      }

      if (result.myRecord) {
        bool = result.myRecord.isNewRecord;
        num = result.myRecord.rank;
        num = result.myRecord.score;
      }

      for (const record of result.ranking) {
        num = record.rank;
        num = record.score;
        str = record.userName;
      }
    }
  }

  if (window.RPGAtsumaru.experimental.screenshot) {
    if (window.RPGAtsumaru.experimental.screenshot.displayModal) {
      await window.RPGAtsumaru.experimental.screenshot.displayModal()
    }

    if (window.RPGAtsumaru.experimental.screenshot.setScreenshotHandler) {
      window.RPGAtsumaru.experimental.screenshot.setScreenshotHandler(() => "some base64 image");
      window.RPGAtsumaru.experimental.screenshot.setScreenshotHandler(async () => "some base64 image");
    }
  }

  if (window.RPGAtsumaru.experimental.globalServerVariable) {
    if (window.RPGAtsumaru.experimental.globalServerVariable.getGlobalServerVariable) {
      const result = await window.RPGAtsumaru.experimental.globalServerVariable.getGlobalServerVariable(123);
      num = result.value;
      str = result.name;
      num = result.maxValue;
      num = result.minValue;
    }

    if (window.RPGAtsumaru.experimental.globalServerVariable.triggerCall) {
      await window.RPGAtsumaru.experimental.globalServerVariable.triggerCall(123);
      await window.RPGAtsumaru.experimental.globalServerVariable.triggerCall(123, 456);
    }
  }

  if (window.RPGAtsumaru.experimental.interplayer) {
    if (window.RPGAtsumaru.experimental.interplayer.enable) {
      await window.RPGAtsumaru.experimental.interplayer.enable();
    }
  }

  if (window.RPGAtsumaru.experimental.user) {
    if (window.RPGAtsumaru.experimental.user.getRecentUsers) {
      const result = await window.RPGAtsumaru.experimental.user.getRecentUsers();
      for (const user of result) {
        str = user.name;
        num = user.id;
      }
    }

    if (window.RPGAtsumaru.experimental.user.getSelfInformation) {
      const result = await window.RPGAtsumaru.experimental.user.getSelfInformation();
      str = result.name;
      num = result.id;
    }

    if (window.RPGAtsumaru.experimental.user.getUserInformation) {
      const result = await window.RPGAtsumaru.experimental.user.getUserInformation(123);
      str = result.name;
      num = result.id;
    }
  }

  if (window.RPGAtsumaru.experimental.signal) {
    if (window.RPGAtsumaru.experimental.signal.getUserSignals) {
      const result = await window.RPGAtsumaru.experimental.signal.getUserSignals();
      for (const signal of result) {
        num = signal.id;
        num = signal.createdAt;
        str = signal.data;
        num = signal.senderId;
        str = signal.senderName;
      }
    }

    if (window.RPGAtsumaru.experimental.signal.sendSignalToUser) {
      await window.RPGAtsumaru.experimental.signal.sendSignalToUser(123, "some signal data");
    }

    if (window.RPGAtsumaru.experimental.signal.getGlobalSignals) {
      const result = await window.RPGAtsumaru.experimental.signal.getGlobalSignals();
      for (const signal of result) {
        num = signal.id;
        num = signal.createdAt;
        str = signal.data;
        num = signal.senderId;
        str = signal.senderName;
      }
    }

    if (window.RPGAtsumaru.experimental.signal.sendSignalToGlobal) {
      await window.RPGAtsumaru.experimental.signal.sendSignalToGlobal("some signal data");
    }
  }

  if (window.RPGAtsumaru.experimental.channel) {
    if (window.RPGAtsumaru.experimental.channel.hasPermission) {
      bool = await window.RPGAtsumaru.experimental.channel.hasPermission(123);
    }
  }
});
