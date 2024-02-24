import { Model } from 'mongoose'
import { objectOutputType, ZodString, ZodTypeAny } from 'zod'

import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { objectOutputType, ZodString, ZodTypeAny } from 'zod';
import { InjectModel } from '@nestjs/mongoose';
import { DbSchemas, TrelloApi } from '@trello-v2/shared';

export abstract class ICardlistService {
  abstract createCardlist(data: TrelloApi.CardlistApi.CreateCardlistRequest): Promise<DbSchemas.CardlistSchema.CardList>

  abstract copyCardlist(
    data: TrelloApi.CardlistApi.CopyCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList>

  abstract copyCardlist(
    data: TrelloApi.CardlistApi.CopyCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList>


  abstract updateCardlist(
    data: TrelloApi.CardlistApi.UpdateCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList>
  abstract moveCardlist(
    data: TrelloApi.CardlistApi.MoveCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList>
  abstract getAllCardlist(): Promise<DbSchemas.CardlistSchema.CardList[]>

  abstract getAllCardlistByBoardId(
    board_id: string
  ): Promise<DbSchemas.CardlistSchema.CardList[]>

  abstract sortCardlistByOldestDate(
    board_id: string
  ): Promise<DbSchemas.CardlistSchema.CardList[]>
  abstract sortCardlistByNewestDate(
    board_id: string
  ): Promise<DbSchemas.CardlistSchema.CardList[]>
  abstract sortCardlistByName(
    board_id: string
  ): Promise<DbSchemas.CardlistSchema.CardList[]>
}

export class CardlistService implements ICardlistService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[0])
    private CardlistMModel: Model<DbSchemas.CardlistSchema.CardList>,
    @InjectModel(DbSchemas.COLLECTION_NAMES[1])
    private BoardMModel: Model<DbSchemas.BoardSchema.Board>
  ) {}
  async createCardlist(
    data: TrelloApi.CardlistApi.CreateCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    // const board = await this.BoardMModel.findById(data.board_id)
    // if (!board) {
    //   // throw new NotFoundError('Board not found')
    //   return { status: 'Not Found', msg: "Can't find cardlist" } as any
    // }
    data.archive_at = null
    data.created_at = new Date()
    const model = new this.CardlistMModel(data)

    return model.save()
  }

  async copyCardlist(
    data: TrelloApi.CardlistApi.CopyCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    const existingCardList = await this.CardlistMModel.findById(data._id)
    if (!existingCardList) {
      return { status: 'Not Found', msg: "Can't find any cardlist" } as any
    }
    const newCardList = new this.CardlistMModel({
      name: existingCardList.name,
      board_id: existingCardList.board_id,
      cards: existingCardList.cards,
      watcher_email: existingCardList.watcher_email,
      index: existingCardList.index,
      archive_at: null
    })
    return newCardList.save()
  }

  async updateCardlist(
    data: TrelloApi.CardlistApi.UpdateCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    const cardlist = await this.CardlistMModel.findById(data._id)
    if (!cardlist) {
      return { status: 'Not Found', msg: "Can't find any cardlist" } as any
    }
    if (data.name) {
      cardlist.name = data.name
    }
    if (data.archive_at) {
      cardlist.archive_at = data.archive_at
    }
    if (data.index) {
      cardlist.index = data.index
    }
    return cardlist.save()
  }

  async moveCardlist(
    data: TrelloApi.CardlistApi.MoveCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    const cardlist = await this.CardlistMModel.findById(data._id)
    if (!cardlist) {
      return { status: 'Not Found', msg: "Can't find any cardlist" } as any
    }
    if (data.board_id) {
      cardlist.board_id = data.board_id
    }
    if (data.index) {
      cardlist.index = data.index
    }
    return cardlist.save()
  }
  async getAllCardlist() {
    return this.CardlistMModel.find().exec()
  }
  async getAllCardlistByBoardId(board_id: string) {
    return this.CardlistMModel.find({ board_id }).exec()
  }

  async sortCardlistByOldestDate(board_id: string) {
    const cardlists = await this.CardlistMModel.find({ board_id }).exec()
    cardlists.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : null
      const dateB = b.created_at ? new Date(b.created_at).getTime() : null

      if (dateA === null && dateB === null) {
        return 0
      } else if (dateA === null) {
        return -1
      } else if (dateB === null) {
        return 1
      }

      return dateA - dateB
    })
    cardlists.forEach((item, index) => {
      item.index = index
      item.save()
    })
    return cardlists
  }

  async sortCardlistByNewestDate(board_id: string) {
    const cardlists = await this.CardlistMModel.find({ board_id }).exec()
    cardlists.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : null
      const dateB = b.created_at ? new Date(b.created_at).getTime() : null

      if (dateA === null && dateB === null) {
        return 0
      } else if (dateA === null) {
        return -1
      } else if (dateB === null) {
        return 1
      }

      return dateB - dateA
    })
    cardlists.forEach((item, index) => {
      item.index = index
      item.save()
    })
    return cardlists
  }

  async sortCardlistByName(board_id: string) {
    const cardlists = await this.CardlistMModel.find({ board_id }).exec()
    cardlists.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      return nameA.localeCompare(nameB)
    })
    cardlists.forEach((item, index) => {
      item.index = index
    })
    cardlists.forEach((item, index) => {
      item.index = index
      item.save()
    })
    return cardlists
  }
}

export class CardlistServiceMock implements ICardlistService {
  createCardlist(data: TrelloApi.CardlistApi.CreateCardlistRequest) {
    return new Promise<DbSchemas.CardlistSchema.CardList>((res) => {
      return res({ ...data, _id: 'Mock-id', watcher_email: [], cards: [] })
    })
  }

  copyCardlist(data: TrelloApi.CardlistApi.CopyCardlistRequest) {
    return new Promise<DbSchemas.CardlistSchema.CardList>((res) => {
      return res({
        ...data,
        board_id: 'Mock-id',
        name: '',
        watcher_email: [],
        cards: [],
        archive_at: null
      })
    })
  }

  updateCardlist(
    data: TrelloApi.CardlistApi.UpdateCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    return new Promise<DbSchemas.CardlistSchema.CardList>((res) => {
      return res({
        ...data,
        board_id: 'Mock-id',
        watcher_email: [],
        cards: [],
        name: 'Mock-name'
      })
    })
  }
  moveCardlist(
    data: TrelloApi.CardlistApi.MoveCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    return new Promise<DbSchemas.CardlistSchema.CardList>((res) => {
      return res({
        ...data,
        board_id: 'Mock-id',
        watcher_email: [],
        cards: [],
        name: 'Mock-name'
      })
    })
  }
  getAllCardlist() {
    return new Promise<DbSchemas.CardlistSchema.CardList[]>((res) => {
      return res([])
    })
  }

  getAllCardlistByBoardId() {
    return new Promise<DbSchemas.CardlistSchema.CardList[]>((res) => {
      return res([])
    })
  }

  sortCardlistByOldestDate(): Promise<DbSchemas.CardlistSchema.CardList[]> {
    return new Promise<DbSchemas.CardlistSchema.CardList[]>((res) => {
      return res([])
    })
  }

  sortCardlistByNewestDate(): Promise<DbSchemas.CardlistSchema.CardList[]> {
    return new Promise<DbSchemas.CardlistSchema.CardList[]>((res) => {
      return res([])
    })
  }

  sortCardlistByName(): Promise<DbSchemas.CardlistSchema.CardList[]> {
    return new Promise<DbSchemas.CardlistSchema.CardList[]>((res) => {
      return res([])
    })
  }
}