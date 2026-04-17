import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

type LoaderProps = {
  title:string,
  className?:string,
}
export function Loader({title, className}:LoaderProps) {
  return (
    <div className="flex flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner className={className}/>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{title}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  )
}
