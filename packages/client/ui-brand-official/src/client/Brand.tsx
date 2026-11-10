import { BrandWordmark, FishLogo } from '@deepseek-ai/dsh-client-ui-primitives'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'

/**
 * Render the project brand mark with the presentation requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the project brand mark.
 */
export function OfficialBrandMark({ size }: SidebarBrandMarkOwnerProps) {
  return <FishLogo size={size} />
}

/**
 * Render the project name artwork without its independently slotted mark.
 * @returns the project name wordmark.
 */
export function OfficialBrandName() {
  return <BrandWordmark includeMark={false} />
}
