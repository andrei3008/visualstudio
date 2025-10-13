import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: string | number
    type: 'increase' | 'decrease' | 'neutral'
  }
  description?: string
  icon: LucideIcon
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray' | 'orange'
  trend?: 'up' | 'down' | 'neutral'
}

export default function StatsCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  color = 'blue',
  trend = 'neutral'
}: StatsCardProps) {
  const getColorClasses = () => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        icon: 'text-blue-600 dark:text-blue-400',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-950/20',
        icon: 'text-green-600 dark:text-green-400',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200 dark:border-green-800'
      },
      yellow: {
        bg: 'bg-yellow-50 dark:bg-yellow-950/20',
        icon: 'text-yellow-600 dark:text-yellow-400',
        text: 'text-yellow-700 dark:text-yellow-300',
        border: 'border-yellow-200 dark:border-yellow-800'
      },
      red: {
        bg: 'bg-red-50 dark:bg-red-950/20',
        icon: 'text-red-600 dark:text-red-400',
        text: 'text-red-700 dark:text-red-300',
        border: 'border-red-200 dark:border-red-800'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-950/20',
        icon: 'text-purple-600 dark:text-purple-400',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-200 dark:border-purple-800'
      },
      gray: {
        bg: 'bg-gray-50 dark:bg-gray-950/20',
        icon: 'text-gray-600 dark:text-gray-400',
        text: 'text-gray-700 dark:text-gray-300',
        border: 'border-gray-200 dark:border-gray-800'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        icon: 'text-orange-600 dark:text-orange-400',
        text: 'text-orange-700 dark:text-orange-300',
        border: 'border-orange-200 dark:border-orange-800'
      }
    }
    return colorMap[color] || colorMap.blue
  }

  const colors = getColorClasses()

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-slate-800 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {value}
            </p>

            {change && (
              <div className="flex items-center gap-2">
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  change.type === 'increase' ? "text-green-600 dark:text-green-400" :
                  change.type === 'decrease' ? "text-red-600 dark:text-red-400" :
                  "text-gray-600 dark:text-gray-400"
                )}>
                  {change.type === 'increase' && '↑'}
                  {change.type === 'decrease' && '↓'}
                  {change.value}
                </div>
                {description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {description}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105",
            colors.bg
          )}>
            <Icon className={cn("h-6 w-6", colors.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}