import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import { useAtomValue } from 'jotai'
import { type ComponentRef, useCallback, useEffect, useRef } from 'react'
import toastAtom from '../atoms/toast'
import supabase from '../lib/supabase'
import Avatar from './avatar'
import ExportJSON from './export-json'

type Props = {
  user: User
}

export default function Profile({ user }: Props) {
  const { toggleColorMode } = useColorMode()
  const { toast } = useAtomValue(toastAtom)
  const exportRef = useRef<ComponentRef<typeof ExportJSON>>(null)
  const onExportOpen = useCallback(() => exportRef.current?.show(), [])

  useEffect(() => {
    toast({
      status: 'warning',
      title:
        'Countryquest will soon store user data locally with end-to-end encryption',
      description: (
        <>
          Please{' '}
          <Button
            variant="link"
            color="inherit"
            fontWeight="inherit"
            textDecoration="underline"
            onClick={onExportOpen}
          >
            export your country list
          </Button>{' '}
          to avoid losing access to your data.
        </>
      ),
      duration: null,
      isClosable: true,
      position: 'top',
      containerStyle: { maxWidth: '100%' },
    })
  }, [onExportOpen, toast])

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} isRound>
          <Avatar user={user} />
        </MenuButton>
        <MenuList>
          <MenuGroup title={user.email}>
            <MenuItem onClick={toggleColorMode}>
              Turn {useColorModeValue('on', 'off')} dark mode
            </MenuItem>
            <MenuItem onClick={onExportOpen}>Export to JSON</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => supabase.auth.signOut()}>
              Sign out
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <ExportJSON ref={exportRef} />
    </>
  )
}
