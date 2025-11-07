import { useState, useRef, useEffect } from 'react';
import { ariaLabels, ariaDescriptions } from '../accessibility/ariaConfig';
import '../styles/LocationSearch.css';

export default function LocationSearch({ onLocationSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  
  const searchRef = useRef(null);
  const suggestionRef = useRef(null);

  // Mock data for demo - replace with actual API call
  const mockLocations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ"
  ];

  // Simulated API call - replace with actual API integration
  const searchLocations = async (query) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const filtered = mockLocations.filter(location =>
        location.toLowerCase().includes(query.toLowerCase())
      );
      
      setSuggestions(filtered);
    } catch (err) {
      setError('Failed to fetch locations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchLocations(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        setSuggestions([]);
        break;
      case 'ArrowDown':
        if (suggestions.length) {
          e.preventDefault();
          const firstSuggestion = suggestionRef.current?.firstChild;
          firstSuggestion?.focus();
        }
        break;
      default:
        break;
    }
  };

  const handleSuggestionKeyDown = (e, suggestion) => {
    switch (e.key) {
      case 'Enter':
        handleLocationSelect(suggestion);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (e.target.previousSibling) {
          e.target.previousSibling.focus();
        } else {
          searchRef.current?.focus();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (e.target.nextSibling) {
          e.target.nextSibling.focus();
        }
        break;
      default:
        break;
    }
  };

  const handleLocationSelect = (location) => {
    setSearchQuery(location);
    setSuggestions([]);
    onLocationSelect?.(location);
  };

  return (
    <div className="location-search" role="search" aria-label={ariaLabels.inputs?.location || "Search for a location"}>
      <div className="search-input-container">
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          aria-label="Location search"
          aria-describedby="location-search-desc"
          aria-expanded={suggestions.length > 0}
          aria-controls="location-suggestions"
          aria-autocomplete="list"
          className="search-input"
        />
        {isLoading && <span className="loading-indicator" role="status">Loading...</span>}
        {error && <span className="error-message" role="alert">{error}</span>}
      </div>

      {suggestions.length > 0 && (
        <ul
          ref={suggestionRef}
          id="location-suggestions"
          className="suggestions-list"
          role="listbox"
          aria-label="Location suggestions"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              role="option"
              tabIndex={0}
              onClick={() => handleLocationSelect(suggestion)}
              onKeyDown={(e) => handleSuggestionKeyDown(e, suggestion)}
              aria-selected={searchQuery === suggestion}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      
      <div id="location-search-desc" className="sr-only">
        {ariaDescriptions.inputs?.location || "Enter a city name to search for weather information"}
      </div>
    </div>
  );
}