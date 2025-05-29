import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Widget {
  id: string
  type: 'weather' | 'news' | 'stock'
  position: number
  size: 'small' | 'medium' | 'large'
  symbol?: string
}

interface LayoutState {
  widgets: Widget[]
  sidebarOpen: boolean
}

const initialState: LayoutState = {
  widgets: [
    { id: 'weather-1', type: 'weather', position: 0, size: 'medium' },
    { id: 'news-1', type: 'news', position: 1, size: 'large' },
    { id: 'stock-1', type: 'stock', position: 2, size: 'medium', symbol: 'AAPL' },
  ],
  sidebarOpen: true,
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    addWidget: (state: LayoutState, action: PayloadAction<Omit<Widget, 'id'>>) => {
      const newId = `${action.payload.type}-${Date.now()}`
      state.widgets.push({ ...action.payload, id: newId })
    },
    removeWidget: (state: LayoutState, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter((widget: Widget) => widget.id !== action.payload)
    },
    updateWidgetPosition: (state: LayoutState, action: PayloadAction<{ id: string; position: number }>) => {
      const widget = state.widgets.find((w: Widget) => w.id === action.payload.id)
      if (widget) {
        widget.position = action.payload.position
      }
    },
    updateWidgetSize: (state: LayoutState, action: PayloadAction<{ id: string; size: Widget['size'] }>) => {
      const widget = state.widgets.find((w: Widget) => w.id === action.payload.id)
      if (widget) {
        widget.size = action.payload.size
      }
    },
    toggleSidebar: (state: LayoutState) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const {
  addWidget,
  removeWidget,
  updateWidgetPosition,
  updateWidgetSize,
  toggleSidebar,
} = layoutSlice.actions

export default layoutSlice.reducer 