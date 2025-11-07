// ARIA Configuration for Cloud-9 Weather App
export const ariaLabels = {
  // Header Section
  header: {
    nav: 'Main navigation',
    home: 'Home page',
    maps: 'Weather maps',
    settings: 'App settings',
  },

  // Weather Widget
  weather: {
    currentWeather: 'Current weather conditions',
    temperature: (temp) => `Current temperature is ${temp} degrees`,
    forecast: 'Weekly weather forecast',
    forecastDay: (day, temp) => `${day}: ${temp} degrees`,
  },

  // Voice Controls
  voice: {
    play: 'Play weather summary',
    stop: 'Stop weather summary',
    loading: 'Loading voice summary',
  },

  // Alerts and Notifications
  alerts: {
    warning: 'Weather warning',
    suggestion: 'Suggestion',
    error: 'Error message',
  }
}

export const ariaRoles = {
  // Landmark Roles
  landmarks: {
    main: 'main',
    nav: 'navigation',
    banner: 'banner',
    complementary: 'complementary',
  },

  // Widget Roles
  widgets: {
    button: 'button',
    alert: 'alert',
    status: 'status',
    dialog: 'dialog',
  }
}

export const ariaLive = {
  // Live Region Settings
  regions: {
    polite: 'polite',      // For non-critical updates
    assertive: 'assertive', // For critical weather alerts
    off: 'off'             // For static content
  },

  // Update Frequency
  frequency: {
    auto: true,       // For automatic weather updates
    manual: false     // For user-triggered updates
  }
}

export const ariaDescriptions = {
  // Detailed descriptions for complex widgets
  weather: {
    icon: (condition) => `Weather condition: ${condition}`,
    trend: (trend) => `Temperature trend: ${trend}`,
    precipitation: (chance) => `Chance of precipitation: ${chance}%`
  },

  // Input field descriptions
  inputs: {
    location: 'Enter city name or zip code',
    settings: 'Customize app preferences',
    voice: 'Control voice playback'
  }
}

// Focus Management Configuration
export const focusConfig = {
  // Tab Order Settings
  tabOrder: [
    'header-nav',
    'current-weather',
    'forecast-grid',
    'voice-controls',
    'settings'
  ],

  // Focus Trap Settings (for modals)
  trapFocus: {
    modal: true,
    alerts: true,
    settings: true
  },

  // Skip Link Target
  skipLink: 'main-content'
}

// Keyboard Navigation Helpers
export const keyboardNav = {
  // Key Mappings
  keys: {
    next: ['ArrowRight', 'ArrowDown'],
    previous: ['ArrowLeft', 'ArrowUp'],
    select: ['Enter', ' '],
    close: ['Escape']
  },

  // Navigation Groups
  groups: {
    forecast: {
      wrap: true,          // Circular navigation
      vertical: false      // Horizontal navigation
    },
    settings: {
      wrap: false,         // No circular navigation
      vertical: true       // Vertical navigation
    }
  }
}

// Helper function to generate complete ARIA attributes
export const getAriaProps = (elementType, context = {}) => {
  switch (elementType) {
    case 'weatherCard':
      return {
        role: ariaRoles.widgets.status,
        'aria-label': ariaLabels.weather.currentWeather,
        'aria-live': ariaLive.regions.polite,
      }
    
    case 'alertPopup':
      return {
        role: ariaRoles.widgets.alert,
        'aria-label': ariaLabels.alerts.warning,
        'aria-live': ariaLive.regions.assertive,
      }
    
    case 'voiceControl':
      return {
        role: ariaRoles.widgets.button,
        'aria-label': context.isPlaying ? ariaLabels.voice.stop : ariaLabels.voice.play,
        'aria-pressed': context.isPlaying,
      }
    
    default:
      return {}
  }
}

// Accessibility Message Generator
export const generateA11yMessage = (type, data) => {
  switch (type) {
    case 'weatherUpdate':
      return `Current temperature is ${data.temperature} degrees. Conditions are ${data.condition}.`
    
    case 'forecast':
      return `${data.day}'s forecast: ${data.temperature} degrees with ${data.condition}.`
    
    case 'alert':
      return `Weather alert: ${data.message}`
    
    default:
      return ''
  }
}
