'use client'
import { Autocomplete, Box, CardSection, Card, Group, NumberFormatter, Flex, Stack, Text, TextInput, Image, Button, Select, ScrollArea, LoadingOverlay, Container, Center } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconFilter, IconHeart, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useGetMetadataQuery, useGetPublicArtworksQuery } from '@/store/api/artwork/artwork';
import AddtoCart from '../_component/AddtoCart';
import AddtoWishlist from '../_component/AddtoWishlist';
import { Pagination } from '@mantine/core';
const page = () => {
 const [page, setPage] = useState(1);
const limit = 12;
const skip = (page - 1) * limit;
  const {data: metadata} = useGetMetadataQuery({})
  const [search, setSearch] = useState('');
  const [debounced] = useDebouncedValue(search, 300);
  const [selectedFilters, setSelectedFilters] = useState({
    price: '',
    medium: '',
    style: '',
    category: '',
  });
   const {data, isLoading} = useGetPublicArtworksQuery({
  skip,
  limit,
  search: debounced,
  price: selectedFilters.price,
  category: selectedFilters.category,
  medium: selectedFilters.medium,
  style: selectedFilters.style,
})   

const artworks = data?.artworks || [];
const total = data?.total || 0;
const totalPages = Math.ceil(total / limit);
    const artStyles = [
        { name: 'Abstract', img: '/images/Rectangle 90.png' },
        { name: 'Realism', img: '/images/Rectangle 20.png' },
        { name: 'Expressionism', img: '/images/Product Image (5).png' },
        { name: 'Impressionism', img: '/images/Product Image (4).png' },
        { name: 'Surrealism', img: '/images/Product Image (3).png' },
        { name: 'Pop Art', img: '/images/Product Image (6).png' },
        { name: 'Landscape', img: '/images/Rectangle 19.png' },
        { name: 'Still Life', img: '/images/Rectangle 87.png' },]
        
     const handleClear = () => {
    setSelectedFilters({ price: '', medium: '', style: '', category: ''  });
  };

return(
    <Box>
        <Flex className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-6'> 
            <Stack className='ml-20 mt-10' gap={2} >
<p className='text-4xl font-bold font-serif'>Browse by Category</p>
<p className='text-grey-100 font-serif'>Explore variety of art piece in all categories of your liking </p>
</Stack>
           
      </Flex>

<div className="flex flex-wrap justify-evenly gap-10 mt-10">
        {artStyles.map((style) => (
          <div key={style.name} className="flex flex-col items-center">
            <img
              src={style.img}
              alt={style.name}
              className="w-28 h-28 rounded-full object-cover shadow-lg"
            />
            <p className="mt-2 text-sm font-semibold text-center">{style.name}</p>
          </div>
        ))}
      </div>
<div className="bg-[#fefae0] p-6">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        <Group gap="xs">
          <Button variant="outline" leftSection={<IconFilter size={16} />}>
            All filters
          </Button>

          <Select
            placeholder="Price"
            data={['Low to High', 'High to Low']}
            value={selectedFilters.price}
            onChange={(val) => setSelectedFilters((prev) => ({ ...prev, price: val || '' }))}
            className="w-32"
          />
          <Select
            placeholder="Categories"
            data={metadata?.categories.map((cat: any) => ({
  value: cat.id,
  label: cat.name,
}))
}
            value={selectedFilters.category}
            onChange={(val) => setSelectedFilters((prev) => ({ ...prev, category: val || '' }))}
            className="w-32"
          />
          <Select
            placeholder="Medium"
            data={metadata?.media.map((medium: any) => ({
  value: medium.id,
  label: medium.name,
}))
}
            value={selectedFilters.medium}
            onChange={(val) => setSelectedFilters((prev) => ({ ...prev, medium: val || '' }))}
            className="w-32"
          />
          <Select
            placeholder="Style"
                data={metadata?.styles.map((style: any) => ({
  value: style.id,
  label: style.name,
}))
}
            value={selectedFilters.style}
            onChange={(val) => setSelectedFilters((prev) => ({ ...prev, style: val || '' }))}
            className="w-32"
          />

          <Button variant="subtle" onClick={handleClear}>
            Clear all
          </Button>
        </Group>

        <Group gap="xs">
          <TextInput
  value={search}
  onChange={(e) => setSearch(e.currentTarget.value)}
  placeholder="Search"
  leftSection={<IconSearch size={16} />}
  className="mr-10"
  classNames={{
    input: 'bg-transparent border-b border-gray-400 rounded-none focus:border-black focus:ring-0',
  }}
/>
        </Group>
      </div>
    </div>
    <Center className="py-10 px-40 mx-auto flex flex-col gap-6">
      <Box className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <LoadingOverlay visible={isLoading} />
        {artworks?.map((item:any) => (
          <Card
            key={item.id}
            shadow="sm"
            radius="md"
            withBorder
            className="bg-red-900"
          >
            <CardSection>
              <Image alt="Product image" src={item?.images[0]?.url} />
            </CardSection>
            <Group className="py-2" justify="space-between" align="center">
              <p className="text-sm font-semibold">{item?.title}</p>
               <Group>
                <AddtoWishlist id={item?.id} />
                <AddtoCart id={item?.id} />
               </Group>
            </Group>
            <Text c="dimmed" className="text-xs font-semibold" size="xs">
              {item?.artist?.first_name} {item?.artist?.last_name}
            </Text>
            <Text className="text-xs font-semibold" size="xs">
              {item?.price}
            </Text>
          </Card>
        ))}
      </Box>
      <Pagination
        value={page}
        onChange={setPage}
        total={totalPages}
        siblings={1}
        boundaries={1}
      />
      </Center>

    </Box>
)
}

export default page;