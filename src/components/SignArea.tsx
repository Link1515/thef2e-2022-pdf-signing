import { useState, useRef } from 'react'
import konva from 'konva'
import { Stage, Layer, Line, KonvaNodeEvents } from 'react-konva'
import { useSignStore } from '../store'

interface Props {
  width: number
  height: number
}

const SignArea = (props: Props) => {
  const { width, height } = props
  const signStore = useSignStore()
  const stage = useRef<konva.Stage>(null)
  const isDrawing = useRef(false)
  const [lines, setLines] = useState<number[][]>([])

  const handleMouseDown: KonvaNodeEvents['onMouseDown'] = () => {
    isDrawing.current = true
    if (!stage.current) return

    const pos = stage.current.getPointerPosition()
    if (!pos) return
    setLines([...lines, [pos.x, pos.y]])
  }

  const handleMouseMove: KonvaNodeEvents['onMouseMove'] = () => {
    if (!isDrawing.current) return
    if (!stage.current) return

    const point = stage.current.getPointerPosition()
    if (!point) return

    let lastLine = lines.at(-1)
    if (!lastLine) return
    // add line point
    lastLine = lastLine.concat([point.x, point.y])

    // replace last line
    lines.splice(-1, 1, lastLine)
    // update lines
    setLines([...lines])
  }

  const handleMouseUp: KonvaNodeEvents['onMouseUp'] = () => {
    isDrawing.current = false
  }

  const handleMouseLeave: KonvaNodeEvents['onMouseLeave'] = () => {
    isDrawing.current = false
  }

  const undo = () => {
    lines.splice(-1, 1)
    setLines([...lines])
  }

  const clear = () => {
    setLines([])
  }

  const save = () => {
    if (!stage.current) return

    const signBase64 = stage.current.toDataURL()
    signStore.saveToLocal(signBase64)
    clear()
  }

  return (
    <div>
      <div className="mb-3 flex items-end gap-4 px-2">
        <h3 className="mr-auto">請在這裡寫下您的簽名</h3>
        <span
          onClick={undo}
          className="cursor-pointer select-none text-sm text-primary"
        >
          回上一步
        </span>
        <span
          onClick={clear}
          className="cursor-pointer select-none text-sm text-primary"
        >
          清除
        </span>
      </div>
      <Stage
        ref={stage}
        className="rounded border border-gray bg-white"
        width={width - 2}
        height={height}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((points, i) => (
            <Line
              key={i}
              points={points}
              stroke="#000"
              strokeWidth={3}
              tension={0.1}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
      <div className="mt-4 text-center">
        <p className="mb-2 text-sm text-gray-dark">
          我了解這是一個具法律效力的本人簽名
        </p>
        <button
          onClick={save}
          className="h-9 w-24 rounded bg-primary px-2 py-1 text-white"
        >
          儲存
        </button>
      </div>
    </div>
  )
}

export default SignArea
