declare namespace API {
  type ApiResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type ApiResponseInt_ = {
    code?: number
    data?: number
    message?: string
  }

  type ApiResponseListImageSearchResult_ = {
    code?: number
    data?: ImageSearchResult[]
    message?: string
  }

  type ApiResponseListSpaceLevel_ = {
    code?: number
    data?: SpaceLevel[]
    message?: string
  }

  type ApiResponseLoginUserVO_ = {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  type ApiResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type ApiResponsePagePicture_ = {
    code?: number
    data?: PagePicture_
    message?: string
  }

  type ApiResponsePagePictureVo_ = {
    code?: number
    data?: PagePictureVo_
    message?: string
  }

  type ApiResponsePageSpace_ = {
    code?: number
    data?: PageSpace_
    message?: string
  }

  type ApiResponsePageSpaceVo_ = {
    code?: number
    data?: PageSpaceVo_
    message?: string
  }

  type ApiResponsePageUserVo_ = {
    code?: number
    data?: PageUserVo_
    message?: string
  }

  type ApiResponsePicture_ = {
    code?: number
    data?: Picture
    message?: string
  }

  type ApiResponsePictureTagCategory_ = {
    code?: number
    data?: PictureTagCategory
    message?: string
  }

  type ApiResponsePictureVo_ = {
    code?: number
    data?: PictureVo
    message?: string
  }

  type ApiResponseSpace_ = {
    code?: number
    data?: Space
    message?: string
  }

  type ApiResponseSpaceVo_ = {
    code?: number
    data?: SpaceVo
    message?: string
  }

  type ApiResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type ApiResponseUser_ = {
    code?: number
    data?: User
    message?: string
  }

  type ApiResponseUserVo_ = {
    code?: number
    data?: UserVo
    message?: string
  }

  type DeleteRequest = {
    id?: number
  }

  type getPictureByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getPictureVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getSpaceByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getSpaceVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserVoByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type ImageSearchResult = {
    fromUrl?: string
    thumbUrl?: string
  }

  type LoginUserVO = {
    createTime?: string
    editTime?: string
    id?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type PagePicture_ = {
    current?: number
    pages?: number
    records?: Picture[]
    size?: number
    total?: number
  }

  type PagePictureVo_ = {
    current?: number
    pages?: number
    records?: PictureVo[]
    size?: number
    total?: number
  }

  type PageSpace_ = {
    current?: number
    pages?: number
    records?: Space[]
    size?: number
    total?: number
  }

  type PageSpaceVo_ = {
    current?: number
    pages?: number
    records?: SpaceVo[]
    size?: number
    total?: number
  }

  type PageUserVo_ = {
    current?: number
    pages?: number
    records?: UserVo[]
    size?: number
    total?: number
  }

  type Picture = {
    category?: string
    createTime?: string
    editTime?: string
    id?: number
    introduction?: string
    isDelete?: number
    name?: string
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    spaceId?: number
    tags?: string
    thumbnailUrl?: string
    updateTime?: string
    url?: string
    userId?: number
  }

  type PictureEditRequest = {
    category?: string
    id?: number
    introduction?: string
    name?: string
    tags?: string[]
  }

  type PictureQueryRequest = {
    category?: string
    current?: number
    endEditTime?: string
    id?: number
    introduction?: string
    name?: string
    nullSpaceId?: boolean
    pageSize?: number
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    searchText?: string
    sortField?: string
    sortOrder?: string
    spaceId?: number
    startEditTime?: string
    tags?: string[]
    userId?: number
  }

  type PictureReviewRequest = {
    id?: number
    reviewMessage?: string
    reviewStatus?: number
  }

  type PictureTagCategory = {
    categoryList?: string[]
    tagList?: string[]
  }

  type PictureUpdateRequest = {
    category?: string
    id?: number
    introduction?: string
    name?: string
    tags?: string[]
  }

  type PictureUploadByBatchRequest = {
    count?: number
    namePrefix?: string
    searchText?: string
  }

  type PictureUploadRequest = {
    fileUrl?: string
    id?: number
    picName?: string
    spaceId?: number
  }

  type PictureVo = {
    category?: string
    createTime?: string
    editTime?: string
    id?: number
    introduction?: string
    name?: string
    picFormat?: string
    picHeight?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    spaceId?: number
    tags?: string[]
    thumbnailUrl?: string
    updateTime?: string
    url?: string
    user?: UserVo
    userId?: number
  }

  type SearchPictureByPictureRequest = {
    pictureId?: number
  }

  type Space = {
    createTime?: string
    editTime?: string
    id?: number
    isDelete?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
    totalCount?: number
    totalSize?: number
    updateTime?: string
    userId?: number
  }

  type SpaceAddRequest = {
    spaceLevel?: number
    spaceName?: string
  }

  type SpaceEditRequest = {
    id?: number
    spaceName?: string
  }

  type SpaceLevel = {
    maxCount?: number
    maxSize?: number
    text?: string
    value?: number
  }

  type SpaceQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    spaceLevel?: number
    spaceName?: string
    userId?: number
  }

  type SpaceUpdateRequest = {
    id?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
  }

  type SpaceVo = {
    createTime?: string
    editTime?: string
    id?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
    totalCount?: number
    totalSize?: number
    updateTime?: string
    user?: UserVo
    userId?: number
  }

  type testDownloadFileUsingGETParams = {
    /** filepath */
    filepath?: string
  }

  type uploadPictureUsingPOSTParams = {
    fileUrl?: string
    id?: number
    picName?: string
    spaceId?: number
  }

  type User = {
    createTime?: string
    editTime?: string
    id?: number
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userPassword?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type UserAddRequest = {
    userAccount?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type UserLoginRequest = {
    userAccount?: string
    userPassword?: string
  }

  type UserQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    userAccount?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type UserRegisterRequest = {
    confirmPassword?: string
    userAccount?: string
    userPassword?: string
  }

  type UserUpdateRequest = {
    id?: number
    userAvatar?: string
    userProfile?: string
    userRole?: string
    username?: string
  }

  type UserVo = {
    createTime?: string
    id?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    username?: string
  }
}
