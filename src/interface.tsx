import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Dispatch, SetStateAction } from "react";

export interface IPosts {
    title: string,
    author: string,
    mainImage: string,
    createdAt: string,
    excerpt: string,
    id?: string
}

export interface ISource {
    source: ImageUrlBuilder,
    setSource: Dispatch<SetStateAction<ImageUrlBuilder>>
}
export interface DataContextType {
    posts: Array<IPosts>,
    urlFor: (source: SanityImageSource) => ImageUrlBuilder,
}
