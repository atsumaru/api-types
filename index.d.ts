/// <reference path="global.d.ts" />

declare module "@atsumaru/api-types" {
  interface AtsumaruApiError extends Error {
    readonly errorType: string
    readonly code: string
  }

  interface StorageItem {
    key: string
    value: string
  }

  interface ScreenshotModalResults {
    tweeted: boolean
  }

  interface ThanksSettings {
    autoThanks?: boolean;
    thanksText?: string;
    thanksImage?: string;
    clapThanksText?: string;
    clapThanksImage?: string;
    giftThanksText?: string;
    giftThanksImage?: string;
  }

  interface TweetSettings {
    tweetText?: string;
    param1?: string;
    param2?: string;
    param3?: string;
    param4?: string;
    param5?: string;
    param6?: string;
    param7?: string;
    param8?: string;
    param9?: string;
  }

  interface ScoreRecord {
    rank: number
    userName: string
    userId: number
    score: number
  }

  interface MyScoreRecord {
    rank: number
    score: number
    isNewRecord: boolean
  }

  interface ScoreboardData {
    ranking: ScoreRecord[]
    myRecord: MyScoreRecord | null
    myBestRecord: ScoreRecord | null
    boardId: number
    boardName: string
  }

  interface GlobalServerVariable {
    value: number | string;
    maxValue: number
    minValue: number
    name: string
  }

  interface GlobalServerVariableTrigger {
    triggerId: number
    triggerType: string
    triggerName: string | null
    memo: string | null
    argument1: string | null
    argument2: string | null
    argument3: string | null
    argument4: string | null
    argument5: string | null
  }

  interface GlobalServerVariableDefinition extends GlobalServerVariable {
    globalServerVariableId: number
    triggers: GlobalServerVariableTrigger[]
  }

  interface SharedSaveItems {
    [userId: number]: string
  }

  interface UserInformation {
    id: number
    name: string
    profile: string
    twitterId: string
    url: string
  }

  interface SelfInformation extends UserInformation {
    isPremium: boolean
  }

  interface UserIdName {
    id: number
    name: string
  }

  interface UserSignal {
    id: number
    senderId: number
    senderName: string
    data: string
    createdAt: number
  }

  interface GlobalSignal {
    id: number
    senderId: number
    senderName: string
    data: string
    createdAt: number
  }

  type CameoutComments = ({
    type: "comment"
    command: string
    comment: string
    createdAt: number
  } | {
    type: "gift"
    command: string
    comment: string
    createdAt: number
    userName: string
    point: number
    thanks: boolean
    reply: string
  })[]

  type PostedComment = {
    type: "comment"
    command: string
    comment: string
  } | {
    type: "gift"
    command: string
    comment: string
    point: number
  }

  type SceneComments = {
    command: string
    comment: string
    context: string
  }[]

  interface InputInfo {
    type: string
    key: string
  }

  interface NicoadPoints {
    totalPoint: number;
    activePoint: number;
  }

  interface NicoadHistories {
    remainingCount: number;
    serverTime: number;
    histories: {
        advertiserName: string;
        nicoadId: number;
        adPoint: number;
        contribution: number;
        startedAt: number;
        endedAt: number;
    }[];
  }

  type NicoadRanking = {
    advertiserName: string;
    totalContribution: number;
    rank: number;
  }[]

  type GiftMyPoints = {
    [itemCode: string]: number;
  }

  type GiftHistories = {
    sceneName: string;
    context: string;
    userName: string;
    point: number;
    comment: string;
    reply: string;
    thanks: boolean;
    createdAt: number;
  }[]

  type GiftRanking = {
    userName: string;
    point: number;
  }[]

  type NextFunc<T> = ((value: T) => void)
  type ErrorFunc = (errorValue: any) => void;

  interface Subject<T> {
    subscribe(observerOrNext: Observer<T> | NextFunc<T>): Subscription
  }

  interface Subscription {
    unsubscribe(): void
    closed: boolean
  }

  interface Observer<T> {
    start?: (subscription: Subscription) => void
    next: NextFunc<T>
    error: ErrorFunc
  }

  interface RPGAtsumaruApi {
    query: {
      [key: string]: string
    }
    storage: {
      getItems(): Promise<StorageItem[]>
      setItems(items: StorageItem[]): Promise<void>
      removeItem(key: string): Promise<void>
      getSharedItems(userIds: number[], gameId?: number): Promise<SharedSaveItems>
    }
    popups: {
      openLink(url: string, comment?: string): Promise<void>
      displayCreatorInformationModal(niconicoUserId?: number): Promise<void>
      displayThanksModal(): Promise<void>
      setThanksSettings(thanksSettings: ThanksSettings): void
    }
    comment: {
      changeScene(sceneName: string): void
      resetAndChangeScene(sceneName: string): void
      pushContextFactor(factor: string): void
      pushMinorContext(): void
      setContext(context: string): void
      cameOut: Subject<CameoutComments>
      posted: Subject<PostedComment>
      verbose: boolean
      getSceneComments(sceneName: string): Promise<SceneComments>
      changeAutoGposMode(mode: string): void
    }
    controllers: {
      defaultController: Subject<InputInfo>
    }
    volume: {
      getCurrentValue(): number
      changed(): Subject<number>
    }
    scoreboards: {
      setRecord(boardId: number, score: number): Promise<void>
      display(boardId: number): Promise<void>
      getRecords(boardId: number): Promise<ScoreboardData>
    }
    screenshot: {
      displayModal(): Promise<ScreenshotModalResults>
      setScreenshotHandler(handler: () => (Promise<string> | string)): void
      setTweetMessage(tweetSettings: TweetSettings | null): void
    }
    globalServerVariable: {
      triggerCall(triggerId: number, value?: number | string): Promise<void>
      triggerCallByName(globalServerVariableName: string, triggerName: string, value?: number | string): Promise<void>
      getGlobalServerVariable(globalServerVariableId: number): Promise<GlobalServerVariable>
      getGlobalServerVariableByName(globalServerVariableName: string): Promise<GlobalServerVariable>
      getAllGlobalServerVariables(): Promise<GlobalServerVariableDefinition[]>
    }
    interplayer: {
      enable(): Promise<void>
    }
    user: {
      getUserInformation(userId: number): Promise<UserInformation>
      getSelfInformation(): Promise<SelfInformation>
      getRecentUsers(): Promise<UserIdName[]>
      getActiveUserCount(minutes: number): Promise<number>
    }
    signal: {
      getUserSignals(): Promise<UserSignal[]>
      sendSignalToUser(receiverId: number, data: string): Promise<void>
      getGlobalSignals(): Promise<GlobalSignal[]>
      sendSignalToGlobal(data: string): Promise<void>
    }
    channel: {
      hasPermission(channelId: number): Promise<boolean>
    }
    nicoad: {
      getPoints(): Promise<NicoadPoints>
      getHistories(offsetAdId?: number): Promise<NicoadHistories>
      getRanking(): Promise<NicoadRanking>
    }
    gift: {
      displayCatalogModal: () => void;
      getTotalPoints: () => Promise<number>;
      getMyPoints: () => Promise<GiftMyPoints>;
      getHistories: () => Promise<GiftHistories>;
      getRanking: () => Promise<GiftRanking>;
    }
  }
}
