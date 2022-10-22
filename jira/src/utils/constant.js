import { ArrowIcon, IconTask } from 'src/components/common/Icon'
import { IconBug } from 'src/components/common/Icon'

export const getIonTaskType = icon => {
  if (icon === 2) {
    return <IconTask />
  }
  if (icon === 1) {
    return <IconBug />
  }
}

export const getIconTaskPriority = icon => {
  if (icon === 1) {
    return <ArrowIcon idPriority={icon} />
  }
  if (icon === 2) {
    return <ArrowIcon idPriority={icon} />
  }
  if (icon === 3) {
    return <ArrowIcon idPriority={icon} />
  }
  if (icon === 4) {
    return <ArrowIcon idPriority={icon} />
  }
}
