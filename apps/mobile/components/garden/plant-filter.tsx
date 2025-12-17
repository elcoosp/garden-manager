import { useState } from 'react';
import { View } from 'react-native';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Filter, ChevronDown } from 'lucide-react-native';

interface PlantFilterProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  selectedSeason: string | null;
  onSeasonChange: (season: string | null) => void;
  seasons: string[];
}

export function PlantFilter({
  selectedType,
  onTypeChange,
  selectedSeason,
  onSeasonChange,
  seasons,
}: PlantFilterProps) {
  const [menuValue, setMenuValue] = useState<string>(selectedType || 'all');

  const plantTypes = [
    { label: 'All Types', value: 'all' },
    { label: 'Vegetables', value: 'vegetable' },
    { label: 'Herbs', value: 'herb' },
    { label: 'Flowers', value: 'flower' },
  ];

  const handleTypeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setMenuValue(value);
      onTypeChange(value === 'all' ? null : value);
    }
  };

  return (
    <View className="mb-4 flex-row items-center gap-4">
      <Menubar value={menuValue} onValueChange={handleTypeChange}>
        <MenubarMenu value={menuValue}>
          <MenubarTrigger>
            <View className="flex-row items-center">
              <Filter size={16} className="mr-2" />
              <Text>Type: {plantTypes.find((t) => t.value === menuValue)?.label || 'All'}</Text>
              <ChevronDown size={16} className="ml-2" />
            </View>
          </MenubarTrigger>
          <MenubarContent>
            {plantTypes.map((type) => (
              <MenubarItem key={type.value}>
                <Text>{type.label}</Text>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex-row items-center gap-2">
            <Text>Season: {selectedSeason || 'All'}</Text>
            <ChevronDown size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <View className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onPress={() => onSeasonChange(null)}>
              <Text>All Seasons</Text>
            </Button>
            {seasons.map((season) => (
              <Button
                key={season}
                variant="ghost"
                className="w-full justify-start"
                onPress={() => onSeasonChange(season)}>
                <Text>{season}</Text>
              </Button>
            ))}
          </View>
        </PopoverContent>
      </Popover>
    </View>
  );
}
