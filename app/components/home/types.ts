export interface HomeScreenState {
  imagesLoaded: boolean;
  showTaskModal: boolean;
  showFriendModal: boolean;
  showDecorations: boolean;
  showPlantModal: boolean;
  sunAmount: number;
  isMessageModalVisible: boolean;
  dialogIndex: number;
  showDialog: boolean;
  selectedIcons: boolean[];
  webGLLoaded: boolean;
}

export interface HomeScreenActions {
  setImagesLoaded: (loaded: boolean) => void;
  setShowTaskModal: (show: boolean) => void;
  setShowFriendModal: (show: boolean) => void;
  setShowDecorations: (show: boolean) => void;
  setShowPlantModal: (show: boolean) => void;
  setSunAmount: (amount: number | ((prev: number) => number)) => void;
  setMessageModalVisible: (visible: boolean) => void;
  setDialogIndex: (index: number | ((prev: number) => number)) => void;
  setShowDialog: (show: boolean) => void;
  setSelectedIcons: (icons: boolean[]) => void;
  setWebGLLoaded: (loaded: boolean) => void;
} 