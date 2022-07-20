import { useData } from '../../utils/useData'
import { getCategorys, getCategoryData,seriesNetworkData } from '../../utils'
import { Layout, Menu, Select } from 'antd'
import { useState } from 'react'
import { MyGraph } from '../../components/MyGraph'

const { Sider, Content } = Layout
const { Option } = Select

export const Home = () => {
  const dataset = useData()
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState()
  const [optionsData, setOptionsData] = useState([])
  const [networksData, setNetworksData] = useState({})

  if (!dataset) {
    return <pre>loading...</pre>
  }

  const categorys = getCategorys(dataset)
  const items = categorys.map((d) => ({
    label: d,
    key: d
  }))

  const options = optionsData.map((d) => (
    <Option key={d.label}>{d.label}</Option>
  ))
 
  const onSearch = (value) => {
    if (value) {
      setIsLoading(true)
      setTimeout(() => {
        const optionsItems = items.filter((item) => item.label.includes(value))
        setOptionsData(optionsItems)
        setIsLoading(false)
      }, 200)
    } else {
      setOptionsData(items)
    }
  }

  const onChange = (value) => {
    setSelected(value)
    const categoryData = getCategoryData(dataset,value);
    setNetworksData(seriesNetworkData(categoryData));
  }
  const onFocus = ()=>{
    setOptionsData(items)
  }

  const onClick = (e)=>{
    setSelected(e.key)
  }

  const onSelect = (e)=>{
    const categoryData = getCategoryData(dataset,e.key);
    setNetworksData(seriesNetworkData(categoryData));

  }

  return (
    <Layout style={{ width: '100%', height: '100vh' }}>
      <Sider
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh'
        }}
        width={300}
      >
        <div style={{ padding: '16px' }}>
          <Select
            placeholder={'搜索营销分类'}
            showSearch
            style={{ width: '100%', height: '32px' }}
            value={selected}
            loading={isLoading}
            allowClear
            onSearch={onSearch}
            onChange={onChange}
            onFocus={onFocus}
          >
            {options}
          </Select>
          </div>
          <Menu
            items={items}
            selectedKeys={selected}
            // defaultSelectedKeys={items[0].key}
            onClick={onClick}
            onSelect={onSelect}
          />
        
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
            <MyGraph networksData={networksData}/>
        </Content>
      </Layout>
    </Layout>
  )
}
