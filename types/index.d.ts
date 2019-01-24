
interface AtsumaruApiError extends Error {
    readonly errorType: string
    readonly code: string
}
declare module AtsumaruTypes{

    interface StorageItem {
        key: string
        value: string
    }

    interface ScoreRecord {
        rank: number
        userName: string
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
        value: number
        maxValue: number
        minValue: number
        name: string
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

    interface CommentItem {
        command: string
        comment: string
    }

    interface InputInfo {
        type: string
        key: string
    }
}
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

interface Experimental {
    query?: {
        [key: string]: string
    }
    storage?: {
        getSharedItems?(userIds: number[], gameId?: number): Promise<AtsumaruTypes.SharedSaveItems>
    }
    popups?: {
        openLink?(url: string): Promise<void>
        displayCreatorInformationModal?(niconicoUserId?: number): Promise<void>
    }
    scoreboards?: {
        setRecord?(boardId: number, score: number): Promise<void>
        display?(boardId: number): Promise<void>
        getRecords?(boardId: number): Promise<AtsumaruTypes.ScoreboardData>
    }
    screenshot?: {
        displayModal?(): Promise<void>
        setScreenshotHandler?(handler: () => (Promise<string> | string)): void
    }
    globalServerVariable?: {
        triggerCall?(triggerId: number, delta?: number): Promise<void>
        getGlobalServerVariable?(globalServerVariableId: number): Promise<AtsumaruTypes.GlobalServerVariable>
    }
    interplayer?: {
        enable?(): Promise<void>
    }
    user?: {
        getUserInformation?(userId: number): Promise<AtsumaruTypes.UserInformation>
        getSelfInformation?(): Promise<AtsumaruTypes.SelfInformation>
        getRecentUsers?(): Promise<AtsumaruTypes.UserIdName[]>
    }
    signal?: {
        getUserSignals?(): Promise<AtsumaruTypes.UserSignal[]>
        sendSignalToUser?(receiverId: number, data: string): Promise<void>
        getGlobalSignals?(): Promise<AtsumaruTypes.GlobalSignal[]>
        sendSignalToGlobal?(data: string): Promise<void>
    }
    channel?: {
        hasPermission?(channelId: number): Promise<boolean>
    }
}

interface RPGAtsumaruApi {
    experimental?: Experimental
    storage: {
        getItems(): Promise<AtsumaruTypes.StorageItem[]>
        setItems(items: AtsumaruTypes.StorageItem[]): Promise<void>
        removeItem(key: string): Promise<void>
    }
    popups: {
        openLink(url: string): Promise<void>
    }
    comment: {
        changeScene(sceneName: string): void
        resetAndChangeScene(sceneName: string): void
        pushContextFactor(factor: string): void
        pushMinorContext(): void
        setContext(context: string): void
        cameOut: Subject<AtsumaruTypes.CommentItem[]>
        posted: Subject<AtsumaruTypes.CommentItem>
        verbose: boolean
    }
    controllers: {
        defaultController: Subject<AtsumaruTypes.InputInfo>
    }
    volume: {
        getCurrentValue(): number
        changed(): Subject<number>
    }
}

interface Window {
    RPGAtsumaru?: RPGAtsumaruApi
}
