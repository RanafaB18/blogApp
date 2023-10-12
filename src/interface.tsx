import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { Dispatch, SetStateAction } from "react";
import {PortableTextBlock} from '@portabletext/types'
export interface IPosts {
    title: string,
    author: string,
    mainImage: string,
    createdAt: string,
    body?: PortableTextBlock[],
    excerpt?: string,
    slug?: string,
    id?: string
}

export interface ISource {
    source: ImageUrlBuilder,
    setSource: Dispatch<SetStateAction<ImageUrlBuilder>>
}
export interface DataContextType {
    posts: Array<IPosts>,
}
