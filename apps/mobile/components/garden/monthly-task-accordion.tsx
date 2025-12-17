import { View } from 'react-native';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react-native';
import {MonthlyTask} from '@garden-manager/shared'

interface MonthlyTaskAccordionProps {
  tasks: MonthlyTask[];
  onTaskToggle?: (month: string, taskIndex: number) => void;
}

export function MonthlyTaskAccordion({ tasks, onTaskToggle }: MonthlyTaskAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {tasks.map((monthTask) => (
        <AccordionItem key={monthTask.month} value={monthTask.month}>
          <AccordionTrigger>
            <View className="flex-row items-center gap-3">
              <Calendar size={16} />
              <Text className="font-semibold">{monthTask.month}</Text>
            </View>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <View className="space-y-3">
                  {monthTask.tasks.map((task, index) => (
                    <View key={index} className="flex-row items-center gap-3">
                      <Checkbox
                        id={`${monthTask.month}-task-${index}`}
                        onCheckedChange={() => onTaskToggle?.(monthTask.month, index)}
                      />
                      <Text className="text-sm">{task}</Text>
                    </View>
                  ))}
                </View>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}