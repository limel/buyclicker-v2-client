import { HeaderTop as Top } from 'components/HeaderTop'
import { HeaderWrapper as Wrapper } from 'components/HeaderWrapper'
import { HeaderBottom as Bottom } from 'components/HeaderBottom'

async function Header() {
  return (
    <Wrapper>
      <Top />
      <Bottom />
    </Wrapper>
  )
}

export default Header
